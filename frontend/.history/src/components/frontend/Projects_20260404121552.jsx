import React from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Banner from '../common/Banner';
import ProjectBanner from '../../assets/images/construction2.jpg';
import SkeletonLoader from '../common/SkeletonLoader';

import ProjectCard from '../common/ProjectCard';
import { apiUrl } from '../common/http';

// SHOW ALL PROJECTS ON PROJECTS PAGE.
const Projects = () => {
  const [projects, setProjects] = React.useState([]);
  const [loading, setLoading] = React.useState(true); // To show loading skeleton while fetching data from api.


  // Api call to fetch all projects
    const fetchAllProjects = async () => {
      try {
        const res = await fetch(`${apiUrl}/get-projects`);
        const result = await res.json();
        setProjects(result.data); // data is coming from backend API response from ProjectController, index()
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); // always stop loading
      }
    };

  React.useEffect(() => {
    fetchAllProjects();
  }, []);

  return (
    <>
      <Header />
      <main>
        <Banner
          heading={
            'Projects That Define Us and Reflect <br /> Our Commitment to Excellence'
          }
          text={
            'Each project we complete stands as a proud testament to our craftsmanship, <br /> technical expertise, and long-term vision for excellence.'
          }
          bgImage={ProjectBanner}
        />
      </main>

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

          {/* only show loading skeleton while fetching data from api */}
          {loading && (
            <div className="container">
              <SkeletonLoader bars={3} width="8px" />
            </div>
          )}

          {/* Only show projects when not loading and projects exist */}
          {!loading && projects.length > 0 && (
            <div className="row pt-5 justify-content-center gy-4">
              {projects.map((project) => (
                // The "project" prop here is sent to ProjectCard.jsx.
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}

          {/* only show empty state when not loading and no projects exist */}
          {!loading && projects.length === 0 && (
            <div className="text-center py-5">
              <div className="empty-state">
                <h5 className="mb-2">No Projects Found</h5>
                <p className="text-muted mb-0">
                  We couldn’t find any projects at the moment.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Projects;
