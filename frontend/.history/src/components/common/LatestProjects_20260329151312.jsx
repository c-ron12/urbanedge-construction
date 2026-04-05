import React from 'react';
import { apiUrl } from './http';
import ProjectCard from './ProjectCard';
import SkeletonLoader from '../common/SkeletonLoader';

// SHOW LATEST PROJECTS ON HOME PAGE.
const LatestProjects = () => {
  const [projects, setProjects] = React.useState([]);
  const [loading, setLoading] = React.useState(true); // To show loading skeleton while fetching data from api.

  // Api call to fetch latest 4 projects.
  const fetchLatestProjects = async () => {
    try {
      const res = await fetch(`${apiUrl}/get-latest-projects?limit=4`);

      // not writting method: 'GET' because by default, the fetch() API uses GET method if you don’t specify anything.
      const result = await res.json();
      setProjects(result.data); // data is coming from backend api response latestProjects function of ProjectsController.
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // always stop loading
    }
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
          {/* Loading, only show loading skeleton while fetching data from api */}  
          {loading && (
            <div className="container">
              <SkeletonLoader bars={3} width="8px" />
            </div>
          )}

          {/* Only show projects when not loading and projects exist */}
          {!loading && projects.length > 0 && (   
            <div className="row pt-5">
              {projects.map((project) => (
                // The "project" prop here is sent to ProjectCard.jsx.
                <ProjectCard key={project?.id} project={project} />
              ))}
            </div>
          )}

          {/* only show empty state when not loading and no projects exist */} 
          {!loading && projects.length === 0 && (
            <p className="text-center pt-5">No projects found</p>
          )}
          
        </div>
      </section>
    </>
  );
};

export default LatestProjects;
