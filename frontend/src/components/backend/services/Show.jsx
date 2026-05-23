import React from 'react';
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import Sidebar from '../../common/Sidebar';

import { Link } from 'react-router-dom'; // using link instead of anchor tag to avoid page reload.
import { toast } from 'react-toastify';
import { Spinner } from 'react-bootstrap';
import { confirmToast } from '../../common/confirmToast';

import { request } from '../../common/httpClient';
import { getErrorMessage } from '../../common/apiErrorHandler';

// SHOW ALL SERVICES IN TABLE.
const Show = () => {
  const [services, setServices] = React.useState([]); // state to store services list, used in table below and in delete function.
  const [loading, setLoading] = React.useState(true); // To show loading skeleton while fetching data from api. true means data is being fetched, false means data has been fetched and we can show the services or empty state.
  const [error, setError] = React.useState(null); // To store error message if api call fails, used in empty state below.

  const fetchServices = async () => {
    setLoading(true); // start loading, show loading spinner.
    setError(null); // clear previous errors (if any) before new fetch attempt, (important when retrying API). Without this, old error messages could still show

    // API call to fetch services
    try {
      const result = await request('services');

      if (result.status === false) {
        setError(result.message || 'Failed to load services');
        setServices([]); // safe fallback in case of error to avoid infinite loading skeleton bug.
        setLoading(false); // stop loading, hide loading spinner and show empty state or error message.
        return;
      }

      setServices(result.data || []); // <-- use result.data (array).. data is coming from backend API response admin/ServiceController@index.
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to load services'));
      setServices([]); // safe fallback in case of error to avoid infinite loading skeleton bug.
    } finally {
      setLoading(false); // stop loading, hide loading spinner and show services or empty state or error message.
    }
  };

  const executeDelete = async (id) => {
    try {
      const result = await request(`services/${id}`, {
        method: 'DELETE',
      });

      if (result.status === true) {
        const filteredServices = services.filter(
          (service) => service.id !== id
        );
        setServices(filteredServices);
        toast.success(result.message || 'Service moved to Trash successfully.');
      } else {
        toast.error(result.message || 'Delete failed');
      }
    } catch (error) {
      toast.error(getErrorMessage(error, 'Failed to delete service'));
    }
  };

  // Custom Toast Confirmation
  const confirmDelete = (service) => {
    confirmToast({
      message: (
        <>
          Are you sure you want to delete this <strong>{service.title}</strong>?
        </>
      ),

      description:
        'This service can be restored from the Trash within 30 days.',

      onConfirm: () => executeDelete(service.id),
    });
  };

  React.useEffect(() => {
    fetchServices();
  }, []);

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
                  <div className="d-flex border-bottom pb-3">
                    <h5>Services</h5>
                    <div className="d-flex ms-auto column-gap-3 row-gap-1 action-btns">
                      <Link
                        to="/admin/services/create"
                        className="btn btn-primary btn-md"
                      >
                        Create
                      </Link>

                      <Link
                        to="/admin/services/trash"
                        className="btn btn-primary btn-md"
                      >
                       Trash
                      </Link>
                    </div>
                  </div>

                  {/* Loading State */}
                  {loading && (
                    <div className="text-center my-5 py-5">
                      <Spinner animation="border" variant="primary" />
                    </div>
                  )}

                  {/* Table */}
                  {!loading && (
                    <div className="table-responsive">
                      <table className="table align-middle">
                        <thead className="table-light border-bottom">
                          <tr>
                            <th className="py-3">ID</th>
                            <th className="py-3">Title</th>
                            <th className="py-3">Slug</th>
                            <th className="py-3">Status</th>
                            <th className="py-3">Actions</th>
                          </tr>
                        </thead>

                        <tbody>
                          {error ? (
                            <tr>
                              <td
                                colSpan="5"
                                className="text-center align-middle py-5"
                              >
                                <div className="text-danger">{error}</div>

                                <span
                                  role="button"
                                  onClick={fetchServices}
                                  className="text-primary fw-bold d-inline-block mt-2 text-decoration-underline"
                                >
                                  Retry
                                </span>
                              </td>
                            </tr>
                          ) : services.length === 0 ? (
                            <tr>
                              <td
                                colSpan="5"
                                className="text-center align-middle py-5"
                              >
                                <div className="text-black">
                                  <p className="m-0">No services found</p>
                                </div>

                                <span
                                  role="button"
                                  onClick={fetchServices}
                                  className="text-primary fw-bold mt-2 d-inline-block text-decoration-underline"
                                >
                                  Refresh
                                </span>
                              </td>
                            </tr>
                          ) : (
                            services.map((service) => (
                              <tr key={service.id}>
                                <td>{service.id}</td>

                                <td style={{ maxWidth: '250px' }}>
                                  <div
                                    className="text-truncate"
                                    title={service.title}
                                  >
                                    {service.title}
                                  </div>
                                </td>

                                <td style={{ maxWidth: '250px' }}>
                                  <div
                                    className="text-truncate"
                                    title={service.slug}
                                  >
                                    {service.slug}
                                  </div>
                                </td>

                                <td>
                                  {service.status == 1 ? 'Active' : 'Inactive'}
                                </td>

                                <td>
                                  <Link
                                    to={`/admin/services/edit/${service.id}`}
                                    className="btn btn-sm btn-info me-3 mb-2 mb-xl-0"
                                  >
                                    Edit
                                  </Link>

                                  <button
                                    onClick={() => confirmDelete(service)}
                                    type="button"
                                    className="btn btn-sm btn-danger"
                                  >
                                    Delete
                                  </button>
                                </td>
                              </tr>
                            ))
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

export default Show;
