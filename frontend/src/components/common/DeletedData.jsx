import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import { apiUrl } from './http';
import { request } from './httpClient';
import { getErrorMessage } from './apiErrorHandler';
import { toast } from 'react-toastify';
import { Spinner } from 'react-bootstrap';

const DeletedData = () => {
  const { resource } = useParams(); // gets 'services', 'projects', 'members', 'testimonials', etc. from URL
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Define a mapping for the table column headers based on the resource parameter
  const columnHeaders = {
    members: 'Name',
    testimonials: 'Testimonials',
    services: 'Title',
    projects: 'Title',
    articles: 'Title',
  };

  // 2. Get the specific label based on the resource, defaulting to 'Title'
  const dynamicHeader = columnHeaders[resource] || 'Title';

  const fetchTrashedData = async () => {
    setLoading(true);
    try {
      const result = await request(`${resource}/trash`);
      if (result.status) {
        setData(result.data || []);
      }
    } catch (error) {
      toast.error(getErrorMessage(error, `Failed to load deleted ${resource}`));
    } finally {
      setLoading(false);
    }
  };

  const handleRestore = async (id) => {
    try {
      const result = await request(`${resource}/${id}/restore`, {
        method: 'PUT',
      });
      if (result.status) {
        toast.success(result.message || 'Restored successfully');
        setData(data.filter((item) => item.id !== id));
      }
    } catch (error) {
      toast.error(getErrorMessage(error, 'Restore failed'));
    }
  };

  const handlePermanentDelete = (id, title) => {
    toast.warn(
      ({ closeToast }) => (
        <div>
          <p className="mb-2">
            Are you sure you want to permanently delete <strong>{title}</strong>
            ?
          </p>
          <div className="d-flex justify-content-end gap-2">
            <button
              className="btn btn-sm btn-danger border-0"
              onClick={() => {
                executePermanentDelete(id);
                closeToast(); // Closes the confirmation toast
              }}
            >
              Yes
            </button>
            <button
              className="btn btn-sm btn-secondary border-0"
              style={{ textTransform: 'none' }}
              onClick={closeToast}
            >
              No
            </button>
          </div>
        </div>
      ),
      {
        position: 'top-right',
        autoClose: false, // Wait for user interaction
        closeOnClick: false,
        draggable: false,
      }
    );
  };

  const executePermanentDelete = async (id) => {
    try {
      // Hits Route::delete('services/{id}') or similar based on resource
      const result = await request(`${resource}/${id}`, {
        method: 'DELETE',
      });
      if (result.status) {
        toast.success(result.message || 'Deleted permanently');
        setData(data.filter((item) => item.id !== id));
      }
    } catch (error) {
      toast.error(getErrorMessage(error, 'Permanent delete failed'));
    }
  };

  useEffect(() => {
    fetchTrashedData();
  }, [resource]);

  return (
    <>
      <Header />
      <main>
        <div className="container my-5 pt-5 pb-2 pb-sm-4">
          <div className="row mt-5">
            <div className="col-md-3">
              <Sidebar />
            </div>
            <div className="col-md-9 mt-4 mt-md-0">
              <div className="card shadow border-0">
                <div className="card-body">
                  <div className="d-flex border-bottom pb-3 mb-3">
                    <h5 className="text-capitalize">Deleted {resource}</h5>
                    <Link
                      to={`/admin/${resource}`}
                      className="btn btn-primary ms-auto btn-sm"
                    >
                      <i className="bi bi-arrow-left me-1"></i>
                      Back
                    </Link>
                  </div>

                  {loading ? (
                    <div className="text-center py-5">
                      <Spinner animation="border" variant="primary" />
                    </div>
                  ) : (
                    <div className="table-responsive">
                      <table className="table align-middle">
                        <thead className="table-light">
                          <tr>
                            <th>ID</th>
                            {/* 3. Use the dynamicHeader variable here */}
                            <th>{dynamicHeader}</th>
                            <th className="text-end">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.length > 0 ? (
                            data.map((item) => {
                              // Extract the correct text value for the row based on what properties exist
                              const itemText =
                                item.title || item.name || item.testimonial;

                              return (
                                <tr key={item.id}>
                                  <td>{item.id}</td>

                                  <td style={{ maxWidth: '250px' }}>
                                    <div
                                      className="text-truncate"
                                      title={itemText}
                                    >
                                      {itemText}
                                    </div>
                                  </td>

                                  <td className="text-end">
                                    <div className="d-flex column-gap-3 row-gap-2 action-btns justify-content-end">
                                      <button
                                        className="btn btn-sm btn-success"
                                        onClick={() => handleRestore(item.id)}
                                      >
                                        Restore
                                      </button>

                                      <button
                                        className="btn btn-sm btn-danger"
                                        onClick={() =>
                                          handlePermanentDelete(
                                            item.id,
                                            itemText
                                          )
                                        }
                                      >
                                        Delete
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })
                          ) : (
                            <tr>
                              <td colSpan="3" className="text-center py-4">
                                No trashed items found.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default DeletedData;
