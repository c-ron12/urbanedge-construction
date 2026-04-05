import React from 'react';
import { apiUrl, fileUrl } from './http';

// // SHOW LATEST PROJECTS ON HOME PAGE
const Projects = () => {
  const [projects, setProjects] = React.useState([]);

  // Api call to fetch latest 4 projects
  const fetchProjects = async () => {
    const res = await fetch(`${apiUrl}/get-latest-projects?limit=4`, {
      method: 'GET',
    });

    const result = await res.json();
    console.log(result);
    setProjects(result.data); // data is coming from backend api response latestProjects function of ProjectsController
  };

  React.useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <>
      <section className="section-3 bg-light pt-5 pb-1 pb-md-4">
        <div className="container-fluid pt-lg-5 pt-3 pb-4">
          <div className="section-header text-center">
            <span>Our Projects</span>
            <h2>Discover our diverse range of projects</h2>
            <p>
              A showcase of our commitment to quality craftsmanship and client
              satisfaction.
            </p>
          </div>

          <div className="row pt-5">
            {projects &&
              projects.map((project) => {
                return (
                  <div key={project.id} className="col-lg-3 col-sm-6 pb-5">
                    <div className="item">
                      <div className="service-image">
                        <img
                          src={`${fileUrl}/uploads/projects/small/${project.image}`}
                          className="w-100"
                          alt="Custom Home Construction"
                        />
                      </div>
                      <div className="service-body">
                        <div className="service-title">
                          <h3>{project.title}</h3>
                        </div>
                        <div className="service-content">
                          <p>{project.short_desc}</p>
                        </div>
                        <a
                          href="#"
                          className="btn btn-primary service-readmore-btn mt-4 small-btn"
                        >
                          Read More
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Projects;
