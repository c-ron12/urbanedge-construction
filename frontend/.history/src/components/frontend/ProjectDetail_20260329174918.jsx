import React from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Banner from '../common/Banner';
import { apiUrl, fileUrl } from '../common/http';
import { useParams, NavLink, useLocation } from 'react-router-dom';
import Testimonials from '../common/LatestTestimonials';
import ProjectBanner from '../../assets/images/construction2.jpg';
import SkeletonLoader from '../common/SkeletonLoader';

const ProjectDetail = () => {
  const params = useParams(); // To get the project id from the url. This id is used to fetch the project details from the backend.
  const location = useLocation(); // To check if user came from external page or from sidebar within project detail page.

  const [project, setproject] = React.useState(null);
  const [loading, setLoading] = React.useState(true); // To show loading skeleton while fetching data from api.
  const [projects, setProjects] = React.useState([]);

  // Api call to fetch all projects
  const fetchProjects = async () => {
    const res = await fetch(`${apiUrl}/get-projects/`, {
      method: 'GET',
    });
    const result = await res.json();
    setProjects(result.data); // Changed: set the array to 'projects'
  };

  // const fetchproject = async () => {
  //   const res = await fetch(`${apiUrl}/get-project/${params.id}`, {
  //     method: 'GET',
  //   });
  //   const result = await res.json();
  //   setproject(result.data);
  // };

  const fetchProject = async () => {
      setLoading(true); // start loading
      try {
        const res = await fetch(`${apiUrl}/get-project/${params.id}`);
        const result = await res.json();
        setProject(result.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); // stop loading
      }
    };

  // Fetch project when component mounts
  React.useEffect(() => {
    if (location.state?.from === 'external') {
      window.scrollTo(0, 0); // If user came from external page (like LatestProjects page) then scroll to top, because they might be in middle of the page when they click on a project. But if they are clicking on project from sidebar of ProjectDetail page, we don't scroll to top because they are already on the project detail page.
    }
    fetchproject();
    fetchProjects();
  }, [params.id]); // Added params.id as a dependency to refetch when the id changes, means when user clicks on another project from sidebar, it will fetch that project details.

  return (
    <>
      <Header />
      <main>
        <Banner
          heading={
            'Projects That Define Us and Reflect <br /> Our Commitment to Excellence'
          }
          title={project?.title || ''}
          text={''}
          bgImage={ProjectBanner}
        />

        {/* SKELETON (ONLY WHEN LOADING) */}
        {!project && (
          <div className="container">
            <SkeletonLoader bars={3} width="8px" />
          </div>
        )}

        {project && (
          <section className="section-9 pt-lg-5 pt-4 pb-2">
            <div className="container py-5">
              <div className="row">
                <div className="col-md-3 mb-5 mb-md-0">
                  <div className="card shadow border-0 sidebar-card">
                    <div className="card-body px-4 py-4">
                      <h3 className="mt-2 mb-3">Our Projects</h3>
                      <ul
                        className="list-unstyled scrollable-list"
                        style={{ fontSize: '17px' }}
                      >
                        {projects.map((project) => {
                          return (
                            <li key={project.id}>
                              <NavLink
                                to={`/project/${project.id}`}
                                className="text-decoration-none link-item"
                              >
                                {project?.title}
                              </NavLink>
                              <hr />
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>

                  <br />

                  <div className="card shadow border-0 sidebar-card mt-4">
                    <div className="card-body px-4 py-4">
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
                              {project?.construction_type}
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
                </div>

                <div className="col-md-9 ps-md-4 ps-0 pe-0">
                  <div>
                    {project?.image && (
                      <img
                        src={`${fileUrl}/uploads/projects/large/${project.image}`}
                        alt={project.title}
                        className="mb-4 w-100 shadow border-0"
                      />
                    )}
                    <h3 className="my-3">{project?.title}</h3>
                    <div>
                      <div
                        className="content-description"
                        dangerouslySetInnerHTML={{ __html: project.content }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

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
