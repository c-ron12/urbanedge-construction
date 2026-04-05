import React from 'react';
import { Link } from 'react-router-dom'; // using link instead of anchor tag to avoid page reload
import Header from '../common/Header';
import Sidebar from '../common/Sidebar';
import Footer from '../common/Footer';
import { toast } from 'react-toastify'; // for toast notifications
import { apiUrl, token } from '../common/http'; // apiUrl is defined in src/components/common/http.js

const show = () => {
  const [projects, setProjects] = React.useState([]); // state to store projects list, used in table below and in delete function

  // FETCH PROJECTS FROM BACKEND API
  const fetchProjects = async () => {
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
    // setProjects(result);
    setProjects(result.data || []); // <-- use result.data (array).. data is coming from backend API response ProjectController@index
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
                          <tr key={project.id}>
                            <td>{project.id}</td>
                            <td>{project.title}</td>
                            <td>{project.slug}</td>

                            <td>
                              {project.status == 1 ? 'Active' : 'Inactive'}
                            </td>

                            <td>
                              <Link
                                to={`/admin/projects/edit/${project.id}`}  // project is the variable from map function
                                className="btn btn-sm btn-info me-2"
                              >
                                Edit
                              </Link>
                              <Link
                                onClick={() => deleteProject(project.id)}
                                href="#"
                                className="btn btn-sm btn-danger"
                              >
                                Delete
                              </Link>
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

export default show;
