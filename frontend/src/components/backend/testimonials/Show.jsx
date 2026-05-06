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

// SHOW ALL TESTIMONIALS IN TABLE.
const Show = () => {
  const [testimonials, setTestimonials] = React.useState([]); // state to store testimonials list, used in table below and in delete function.
  const [loading, setLoading] = React.useState(true); // To show loading skeleton while fetching data from api. true means data is being fetched, false means data has been fetched and we can show the testimonials or empty state.
  const [error, setError] = React.useState(null); // To store error message if api call fails, used in empty state below.

  // API call to fetch testimonials
  const fetchTestimonials = async () => {
    setLoading(true); // start loading, show loading spinner.

    // API call to fetch testimonials
    try {
      const result = await request(`${apiUrl}/testimonials`);

      if (result.status === false) {
        setError(result.message || 'Failed to load testimonials');
        setTestimonials([]); // safe fallback in case of error to avoid infinite loading skeleton bug.
        setLoading(false); // stop loading, hide loading spinner and show empty state or error message.
        return;
      }

      setTestimonials(result.data || []); // <-- use result.data (array).. data is coming from backend API response admin/ServiceController@index.
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to load testimonials'));
      setTestimonials([]); // safe fallback in case of error to avoid infinite loading skeleton bug.
    } finally {
      setLoading(false); // stop loading, hide loading spinner and show testimonials or empty state or error message.
    }
  };

  const deleteTestimonial = async (id) => {
    // function to delete testimonial by id.

    if (confirm('Are you sure you want to delete this testimonial?')) {
      try {
        const res = await fetch(`${apiUrl}/testimonials/${id}`, {
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
          //  It filters the current 'testimonials' array stored in component state).
          // It keeps every testimonial whose 'id' does NOT match the 'id' of the testimonial that was just deleted.
          const filteredtestimonials = testimonials.filter(
            (testimonial) => testimonial.id !== id
          ); // remove deleted testimonial from state.

          setTestimonials(filteredtestimonials);
          toast.success(result.message);
        } else {
          toast.error(result.message || 'Delete failed');
        }
      } catch (error) {
        console.error('Delete testimonial error:', error);

        if (error.message === 'Failed to fetch') {
          toast.error('Network error. Please check your internet connection.');
        } else if (error.message === 'SERVER_ERROR') {
          toast.error('Server error. Please try again later.');
        } else {
          toast.error('Failed to delete testimonial');
        }
      }
    }
  };

  React.useEffect(() => {
    fetchTestimonials();
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
                    <h5>Testimonials</h5>
                    <Link
                      to="/admin/testimonials/create"
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
                            <th className="py-3">Testimonials</th>
                            <th className="py-3">Citation</th>
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
                                  onClick={fetchTestimonials}
                                  className="text-primary fw-bold d-inline-block mt-2 text-decoration-underline"
                                >
                                  Retry
                                </span>
                              </td>
                            </tr>
                          ) : testimonials.length === 0 ? (
                            <tr>
                              <td
                                colSpan="5"
                                className="text-center align-middle py-5"
                              >
                                <div className="text-black">
                                  <p className="m-0">No testimonials found</p>
                                </div>

                                <span
                                  role="button"
                                  onClick={fetchTestimonials}
                                  className="text-primary fw-bold mt-2 d-inline-block text-decoration-underline"
                                >
                                  Refresh
                                </span>
                              </td>
                            </tr>
                          ) : (
                            testimonials.map((testimonial) => (
                              <tr key={testimonial.id}>
                                <td>{testimonial.id}</td>

                                <td style={{ maxWidth: '250px' }}>
                                  <div
                                    className="text-truncate"
                                    title={testimonial.testimonial}
                                  >
                                    {testimonial.testimonial}
                                  </div>
                                </td>

                                <td>{testimonial.citation}</td>

                                <td>
                                  {testimonial.status == 1
                                    ? 'Active'
                                    : 'Inactive'}
                                </td>

                                <td>
                                  <Link
                                    to={`/admin/testimonials/edit/${testimonial.id}`}
                                    className="btn btn-sm btn-info me-3 mb-2 mb-xl-0"
                                  >
                                    Edit
                                  </Link>

                                  <button
                                    onClick={() =>
                                      deleteTestimonial(testimonial.id)
                                    }
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
