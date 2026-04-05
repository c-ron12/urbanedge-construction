import React from 'react';
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import Sidebar from '../../common/Sidebar';
import { apiUrl, token } from '../../common/http'; // apiUrl is defined in src/components/common/http.js.
import { Link } from 'react-router-dom'; // using link instead of anchor tag to avoid page reload.
import { toast } from 'react-toastify';

// SHOW ALL TESTIMONIALS IN TABLE.
const Show = () => {
  const [testimonials, setTestimonials] = React.useState([]); // state to store testimonials list, used in table below and in delete function.

  const fetchTestimonials = async () => {
    const res = await fetch(`${apiUrl}/testimonials`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token()}`,
      },
    });

    const result = await res.json();
    console.log(result);
    // set(result);.
    setTestimonials(result.data || []); // <-- use result.data (array).. data is coming from backend API response TestimonialController@index.
  };

  const deleteTestimonial = async (id) => {
    // function to delete testimonial by id.

    if (confirm('Are you sure you want to delete this testimonial?')) {
      const res = await fetch(`${apiUrl}/testimonials/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token()}`,
        },
      });
      const result = await res.json();

      if (result.status === true) {
        //  It filters the current 'testimonials' array stored in component state).
        // It keeps every testimonial whose 'id' does NOT match the 'id' of the testimonial that was just deleted.
        const filteredtestimonials = testimonials.filter(
          (testimonial) => testimonial.id !== id
        ); // remove deleted testimonial from state.

        setTestimonials(filteredtestimonials);
        toast.success(result.message);
      } else {
        toast.error(result.message);
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
        <div className="container my-5">
          <div className="row">
            <div className="col-md-3">
              <Sidebar />
            </div>
            <div className="col-md-9">
              <div className="card shadow border-0">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <h5>Testimonials</h5>
                    <Link
                      to="/admin/testimonials/create"
                      className="btn btn-primary"
                    >
                      Create
                    </Link>
                  </div>
                  <hr />
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Testimonials</th>
                        <th>Citation</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {testimonials &&
                        testimonials.map((testimonial) => (
                          <tr key={testimonial?.id}>
                            <td>{testimonial?.id}</td>
                            <td>{testimonial?.testimonial}</td>
                            <td>{testimonial?.citation}</td>

                            <td>
                              {testimonial?.status == 1 ? 'Active' : 'Inactive'}
                            </td>

                            <td>
                              <Link
                                to={`/admin/testimonials/edit/${testimonial?.id}`}
                                className="btn btn-sm btn-info me-2 mb-2"
                              >
                                Edit
                              </Link>
                              <button
                                onClick={() => deleteTestimonial(testimonial?.id)}
                                type="button"
                                className="btn btn-sm btn-danger"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
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
