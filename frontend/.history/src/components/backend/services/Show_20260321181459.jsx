import React from 'react';
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import Sidebar from '../../common/Sidebar';
import { apiUrl, token } from '../../common/http'; // apiUrl is defined in src/components/common/http.js.
import { Link } from 'react-router-dom'; // using link instead of anchor tag to avoid page reload.
import { toast } from 'react-toastify';

// SHOW ALL SERVICES IN TABLE.
const Show = () => {
  const [services, setServices] = React.useState([]); // state to store services list, used in table below and in delete function.

  const fetchServices = async () => {
    const res = await fetch(`${apiUrl}/services`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token()}`,
      },
    });

    const result = await res.json();
    console.log(result);
    // setServices(result);.
    setServices(result.data || []); // <-- use result.data (array).. data is coming from backend API response ServiceController@index.
  };

  const deleteService = async (id) => {
    // function to delete service by id.

    if (confirm('Are you sure you want to delete this service?')) {
      const res = await fetch(`${apiUrl}/services/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token()}`,
        },
      });
      const result = await res.json();

      if (result.status === true) {
        //  It filters the current 'services' array stored in component state).
        // It keeps every service whose 'id' does NOT match the 'id' of the service that was just deleted.
        const filteredServices = services.filter(
          (service) => service.id !== id
        ); // remove deleted service from state.

        setServices(filteredServices);
        toast.success(result.message);
      } else {
        toast.error(result.message);
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
        <div className="container my-5">
          <div className="row">
            <div className="col-md-3">
              <Sidebar />
            </div>
            <div className="col-md-9">
              <div className="card shadow border-0">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <h5>Services</h5>
                    <Link
                      to="/admin/services/create"
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
                        <th>Name</th>
                        <th>Slug</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {services &&
                        services.map((service) => (
                          <tr key={service.id}>
                            <td>{service.id}</td>
                            <td>{service.title}</td>
                            <td>{service.slug}</td>

                            <td>
                              {service.status == 1 ? 'Active' : 'Inactive'}
                            </td>

                            <td>
                              <Link
                                to={`/admin/services/edit/${service.id}`}
                                className="btn btn-sm btn-info me-2"
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
