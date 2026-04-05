import React from 'react';
import { apiUrl } from './http';

// SHOW LATEST PROJECTS ON HOME PAGE.
const LatestProjects = () => {
  const [projects, setProjects] = React.useState([]);

  // Api call to fetch latest 4 projects.
  const fetchLatestProjects = async () => {
    const res = await fetch(`${apiUrl}/get-latest-projects?limit=4`, {
      method: 'GET',
    });

    const result = await res.json();
    // console.log(result);
    setProjects(result.data); // data is coming from backend api response latestProjects function of frontend/ProjectsController.
  };

  React.useEffect(() => {
    fetchLatestProjects(); 
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
               
              })}
          </div>
        </div>
      </section>
    </>
  );
};

export default LatestProjects;
