import React from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Banner from '../common/Banner';
import BannerImg from '../../assets/images/banner2.jpg';
import { apiUrl, fileUrl } from '../common/http';
import { useParams, NavLink } from 'react-router-dom';
import Testimonials from '../common/LatestTestimonials';
import ProjectBanner from '../../assets/images/construction2.jpg';

const projectDetail = () => {
  const params = useParams();

  const [project, setproject] = React.useState([]);
  const [projects, setprojects] = React.useState([]);

  const fetchprojects = async () => {
    const res = await fetch(`${apiUrl}/get-projects/`, {
      method: 'GET',
    });
    const result = await res.json();
    setprojects(result.data); // Changed: set the array to 'projects'
  };

  const fetchproject = async () => {
    const res = await fetch(`${apiUrl}/get-project/${params.id}`, {
      method: 'GET',
    });
    const result = await res.json();
    setproject(result.data); // Changed: set the single object to 'project'
  };

  // Fetch project when component mounts
  React.useEffect(() => {
    fetchproject();
    fetchprojects();
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
        <section className="section-9 pt-lg-5 pt-4 pb-2">
          <div className="container py-5">
            <div className="row">
              <div className="col-md-3 mb-5 mb-md-0">
                <div className="card shadow border-0 sidebar-card">
                  <div className="card-body px-4 py-4">
                    <h3 className="mt-2 mb-3">Our projects</h3>
                    <ul className="list-unstyled ">
                      {projects.map((project) => {
                        return (
                          <li key={project.id}>
                            <NavLink
                              to={`/projects/${project.id}`}
                              className="text-decoration-none item-link"
                            >
                              {project.title}
                            </NavLink>
                            <hr />
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-md-9">
                <div>
                  <img
                    src={`${fileUrl}/uploads/projects/large/${project?.image}`}
                    alt={project?.title}
                    className="mb-4 w-100 shadow border-0"
                  />
                  <h3 className="mb-3">{project?.title}</h3>
                  <div>
                    <div className= 'content-description'
                      dangerouslySetInnerHTML={{ __html: project?.content }}
                    />
                  </div>
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

export default projectDetail;
