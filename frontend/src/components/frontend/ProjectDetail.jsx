import React from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Banner from '../common/Banner';
import { apiUrl, fileUrl } from '../common/http';
import { useParams, NavLink, useLocation } from 'react-router-dom';
import Testimonials from '../common/LatestTestimonials';
import ProjectBanner from '../../assets/images/construction2.jpg';
import SkeletonLoader from '../common/SkeletonLoader';
import EmptyState from '../common/EmptyState'; // Reusable component to show empty state when no project is found.
import useFetch from '../../hooks/useFetch';   // 

const ProjectDetail = () => {
  const params = useParams(); // To get the project id from the url. This id is used to fetch the project details from the backend.
  const location = useLocation(); // Determine navigation source via location.state.from  (external: Home Page/Latest Projects section, Projects page or global footer except ProjectDetail page; internal sidebar/footer of ProjectDetail page)

  const [projects, setProjects] = React.useState([]);
  const sectionRef = React.useRef(null); // Reference to section element; used to scroll into view when navigation from external page or internal page.
  
  // Api call to fetch all projects
  const fetchProjects = async () => {
    try {
      const res = await fetch(`${apiUrl}/get-projects/`);

      if (!res.ok) {
        throw new Error('SERVER_ERROR');
      }

      // Converts JSON (string) response body into JavaScript object.
      // Throws if response is not valid JSON (caught in catch, but not as 'INVALID_RESPONSE' unless rethrown)
      const result = await res.json();

      if (!result || !Array.isArray(result.data)) {
        // data is coming from backend api response from frontend/ProjectController index() function.
        throw new Error('INVALID_RESPONSE');
      }

      setProjects(result.data);
    } catch (error) {
      console.error('Fetch projects error:', error);
      setProjects([]); // safe fallback in case of error to avoid infinite loading skeleton bug in sidebar and to show empty state in sidebar instead of loading skeleton.
    }
  };

  // use hook to manage all state and fetch project details.
  const {
    data: project,
    loading,
    error,
  } = useFetch(`${apiUrl}/get-project/${params.id}`, false); // use false to fetch single service instead of array(list) of services.

  React.useEffect(() => {
    if (location.state?.from === 'external') {
      window.scrollTo(0, 0); // If user came from external page like Home page or Projects page then scroll to top, because they might be in middle or end of the page when they click on a particluar project. But if they are clicking on project from sidebar of ProjectDetail page, we don't scroll to top because they are already on the project detail page.
    } else if (location.state?.from === 'footer') {
      sectionRef.current?.scrollIntoView(); // Scroll the page until this section is visible, <section className="section-9 pt-4 pt-sm-5 pb-4" ref={sectionRef}>
    } else if (location.state?.from === 'sidebar') {
      sectionRef.current?.scrollIntoView();
    }

    fetchProjects();
  }, [params.id]); // // Added params.id as a dependency to refetch when the id changes, means when user clicks on another project from sidebar, it will fetch that project details.

  return (
    <>
      <Header />
      <main style={{ marginTop: '80px' }}>
        <Banner
          heading={
            'Projects That Define Us and Reflect <br /> Our Commitment to Excellence'
          }
          title={project?.title || ''}
          text={''}
          bgImage={ProjectBanner}
        />

        <section className="section-9 pt-4 pt-sm-5 pb-4" ref={sectionRef}>
          <div className="container pt-lg-5 pt-4 pb-3">
            <div className="row">
              {/* Sidebar */}
              <div className="col-md-3 mb-5 mb-md-0">
                <div className="card shadow border-0 sidebar-card">
                  <div className="card-body p-lg-4 p-3">
                    <h3 className="mt-2 mb-3">Our Projects</h3>
                    <ul className="list-unstyled scrollable-list">
                      {projects.map((project) => (
                        <li key={project.id}>
                          <NavLink
                            to={`/project/${project.id}`}
                            state={{ from: 'sidebar' }}
                            className="text-decoration-none link-item"
                          >
                            {project.title}
                          </NavLink>
                          <hr />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <br />

                {/* Insights */}
                {!loading && project && (
                  <div className="card shadow border-0 sidebar-card mt-4">
                    <div className="card-body p-lg-4 p-3">
                      <h3 className="mt-2 mb-3">Insights</h3>
                      <ul className="list-unstyled">
                        {project.location && (
                          <li className="mb-2">
                            <p className="mb-0 text-black">Location</p>
                            <p className="text-muted">{project.location}</p>
                          </li>
                        )}

                        {project.construction_type && (
                          <li className="mb-2">
                            <p className="mb-0 text-black">Construction Type</p>
                            <p className="text-muted">
                              {project.construction_type}
                            </p>
                          </li>
                        )}

                        {project.sector && (
                          <li className="mb-2">
                            <p className="mb-0 text-black">Sector</p>
                            <p className="text-muted">{project.sector}</p>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* Main Content */}
              <div className="col-md-9 ps-md-4">
                <div className="position-relative">
                  {/* Loader centered, only show content when not loading and project exists */}

                  {loading && (
                    <div
                      className="d-flex justify-content-center align-items-center"
                      style={{ minHeight: '400px' }}
                    >
                      <SkeletonLoader bars={3} width="8px" />
                    </div>
                  )}

                  {/* Project Content, only show content when not loading and project exists  */}
                  {!loading && project && (
                    <>
                      {project.image && (
                        <img
                          src={`${fileUrl}/uploads/projects/large/${project.image}`}
                          alt={project.title}
                          className="mb-4 w-100 shadow border-0"
                        />
                      )}

                      <h3 className="my-2">{project.title}</h3>

                      <div
                        className="content-description"
                        dangerouslySetInnerHTML={{ __html: project.content }}
                      />
                    </>
                  )}

                  {/* No Data, only show empty state when not loading and no projects exist */}
                  {!loading && !project && (
                    <EmptyState>
                      <h5>
                        {error ? 'Error loading project' : 'No data found'}
                      </h5>
                      <p className="text-muted mb-0">
                        {error || 'We couldn’t find this project.'}
                      </p>
                    </EmptyState>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-10">
          <div className="container-fluid bg-light">
            <div className="row">
              <div className="col-md-12">
                <Testimonials />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default ProjectDetail;
