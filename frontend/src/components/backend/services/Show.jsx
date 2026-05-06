import React from 'react';
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import Sidebar from '../../common/Sidebar';
import { apiUrl, token } from '../../common/http'; // apiUrl is defined in src/components/common/http.js.
import { Link } from 'react-router-dom'; // using link instead of anchor tag to avoid page reload.
import { toast } from 'react-toastify';
import { Spinner } from 'react-bootstrap';

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
      const result = await request(`${apiUrl}/services`);

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

  const deleteService = async (id) => {
    // function to delete service by id.

    if (confirm('Are you sure you want to delete this service?')) {
      try {
        const res = await fetch(`${apiUrl}/services/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token()}`,
          },
        });

        // Handle HTTP errors
        if (!res.ok) {
          throw new Error('SERVER_ERROR');
        }

        const result = await res.json();

        // Safety check
        if (!result || typeof result.status === 'undefined') {
          throw new Error('INVALID_RESPONSE');
        }

        if (result.status === true) {
          //  It filters the current 'services' array stored in component state).
          // It keeps every service whose 'id' does NOT match the 'id' of the service that was just deleted.
          const filteredservices = services.filter(
            (service) => service.id !== id
          ); // remove deleted service from state.

          setServices(filteredservices);
          toast.success(result.message);
        } else {
          toast.error(result.message || 'Delete failed');
        }
      } catch (error) {
        console.error('Delete service error:', error);

        if (error.message === 'Failed to fetch') {
          toast.error('Network error. Please check your internet connection.');
        } else if (error.message === 'SERVER_ERROR') {
          toast.error('Server error. Please try again later.');
        } else {
          toast.error('Failed to delete service');
        }
      }
    }
  };

  React.useEffect(() => {
    fetchServices();
  }, []);

  return (
    <>
      <Header />

      <main>
        <div className="container my-sm-5 my-4 pt-5 pb-4">
          <div className="row mt-5">
            <div className="col-md-3 mb-4 mb-md-0">
              <Sidebar />
            </div>
            <div className="col-md-9">
              <div className="card shadow border-0">
                <div className="card-body">
                  <div className="d-flex justify-content-between border-bottom pb-4">
                    <h5>Services</h5>
                    <Link
                      to="/admin/services/create"
                      className="btn btn-primary"
                    >
                      Create
                    </Link>
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
                            <th className="py-3">Name</th>
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
                                    onClick={() => deleteService(service.id)}
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
