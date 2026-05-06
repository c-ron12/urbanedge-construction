import React from 'react';
import { apiUrl } from './http';
import ProjectCard from './ProjectCard';
import SkeletonLoader from '../common/SkeletonLoader';
import EmptyState from '../common/EmptyState'; // Reusable component to show empty state when no projects are found.
import useFetch from '../../hooks/useFetch'; // Reusable hook to fetch data from API

// SHOW LATEST PROJECTS ON HOME PAGE.
const LatestProjects = () => {
  // use hook to manage all state and fetch latest projects.
  const {
    data: projects,
    loading,
    error,
    refetch,
  } = useFetch(`${apiUrl}/get-latest-projects?limit=4`);

  return (
    <>
      <section className="section-3 bg-light pt-4 pt-sm-5 pb-1 pb-md-4">
        <div className="container-fluid pt-lg-5 pb-3 pb-md-4">
          <div className="section-header text-center">
            <span>Our Projects</span>
            <h2>Discover our diverse range of projects</h2>
            <p className="title-desc-text">
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

          {/* only show projects when not loading and projects exist */}
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
            <EmptyState>
              <h5>{error ? 'Error loading projects' : 'No projects found'}</h5>
              <p className="text-muted mb-0">
                {error || 'We couldn’t find any projects at the moment.'}
              </p>

              {error === 'Unexpected data received.' ? (
                <Link
                  to="/contact"
                  className="text-primary fw-bold mt-2 d-inline-block text-decoration-underline"
                >
                  Contact Support
                </Link>
              ) : (
                <span
                  role="button"
                  onClick={refetch}
                  className="text-primary fw-bold mt-2 d-inline-block text-decoration-underline"
                >
                  {error ? 'Retry' : 'Refresh'}
                </span>
              )}
            </EmptyState>
          )}
        </div>
      </section>
    </>
  );
};

export default LatestProjects;
