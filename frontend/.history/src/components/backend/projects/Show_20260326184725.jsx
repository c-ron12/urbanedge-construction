import React from 'react';
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import Sidebar from '../../common/Sidebar';
import { apiUrl, token } from '../../common/http'; // apiUrl is defined in src/components/common/http.js.
import { Link } from 'react-router-dom'; // usinf link instead of anchor tag to avoid page reload.
import { toast } from 'react-toastify';
import { Spinner } from 'react-bootstrap';

const show = () => {
  const [projects, setProjects] = React.useState([]); // state to store projects list, used in table below and in delete function.
  const [loading, setLoading] = React.useState(true); // true means data is being fetched

  // FETCH PROJECTS FROM BACKEND API.
  const fetchProjects = async () => {
    setLoading(true); // start loading
    const res = await fetch(`${apiUrl}/projects`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token()}`,
      },
    });

    const result = await res.json();
    console.log(result);
    // setProjects(result);.
    setProjects(result.data || []); // <-- use result.data (array).. data is coming from backend API response ProjectController@index.
    setLoading(false); // stop loading
  };

  const deleteProject = async (id) => {
    // function to delete project by id.

    if (confirm('Are you sure you want to delete this project?')) {
      const res = await fetch(`${apiUrl}/projects/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token()}`,
        },
      });
      const result = await res.json();

      if (result.status === true) {
        //  It filters the current 'project' array stored in component state).
        // It keeps every project whose 'id' does NOT match the 'id' of the project that was just deleted.
        const filteredProjects = projects.filter(
          (project) => project.id !== id
        ); // remove deleted project from state.

        setProjects(filteredProjects);
        toast.success(result.message); // message is coming backend API response from ProjectController@destroy.
      } else {
        toast.error(result.message);
      }
    }
  };

  React.useEffect(() => {
    fetchProjects();
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
                    <h5>Projects</h5>
                    <Link
                      to="/admin/projects/create"
                      className="btn btn-primary"
                    >
                      Create
                    </Link>
                  </div>
                  <hr />
                  {loading ? (
                    <div className="text-center my-5">
                      <Spinner animation="border" variant="primary" />
                    </div>
                  ) : (
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
                        {projects &&
                          projects.map((project) => (
                            <tr key={project?.id}>
                              <td>{project?.id}</td>
                              <td>{project?.title}</td>
                              <td>{project?.slug}</td>

                              <td>
                                {project?.status == 1 ? 'Active' : 'Inactive'}
                              </td>

                              <td>
                                <Link
                                  to={`/admin/projects/edit/${project?.id}`} // project is the variable from map function.
                                  className="btn btn-sm btn-info me-2"
                                >
                                  Edit
                                </Link>
                                <button
                                  onClick={() => deleteProject(project?.id)}
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

export default show;
