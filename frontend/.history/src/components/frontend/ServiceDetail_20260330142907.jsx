import React from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Banner from '../common/Banner';
import BannerImg from '../../assets/images/banner2.jpg';
import { apiUrl, fileUrl } from '../common/http';
import Testimonials from '../common/LatestTestimonials';
import SkeletonLoader from '../common/SkeletonLoader';
import { useParams, NavLink, useLocation } from 'react-router-dom';

const ServiceDetail = () => {
  const params = useParams();
  const location = useLocation(); // To check if user came from external page or from sidebar within service detail page.

  const [service, setService] = React.useState(null);
  const [loading, setLoading] = React.useState(true); // To show loading skeleton while fetching data from api.
  const [services, setServices] = React.useState([]);

  const fetchServices = async () => {
    const res = await fetch(`${apiUrl}/get-services/`, {
      method: 'GET',
    });
    const result = await res.json();
    setServices(result.data);
  };

  // Api call to fetch single service
  const fetchService = async () => {
    setLoading(true); // start loading
    try {
      const res = await fetch(`${apiUrl}/get-service/${params.id}`);
      const result = await res.json();
      setService(result.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // stop loading
    }
  };

  React.useEffect(() => {
    if (location.state?.from === 'external') {
      // From cards → go to top
      window.scrollTo(0, 0);
    } else if (location.state?.from === 'footer') {
      // From footer → scroll to sidebar section
      setTimeout(() => {
        const sidebarSection = document.querySelector('.section-9');
        if (sidebarSection) {
          sidebarSection.scrollIntoView({ behavior: 'auto' });
        }
      }, 100); // wait for render
    }

    fetchService();
    fetchServices();
  }, [params.id]);

  return (
    <>
      <Header />

      <main>
        <Banner
          heading={'Shaping Tomorrows <br /> Structures Today'}
          title={service?.title || ''}
          text={''}
          bgImage={BannerImg}
        />

        <section className="section-9 pt-lg-5 pt-4 pb-2">
          <div className="container py-5">
            <div className="row">
              {/* Sidebar */}
              <div className="col-md-3 mb-5 mb-md-0">
                <div className="card shadow border-0 sidebar-card">
                  <div className="card-body px-4 py-4">
                    <h3 className="mt-2 mb-3">Our Services</h3>
                    <ul
                      className="list-unstyled scrollable-list"
                      style={{ fontSize: '17px' }}
                    >
                      {services.map((service) => (
                        <li key={service.id}>
                          <NavLink
                            to={`/service/${service.id}`}
                            className="text-decoration-none link-item"
                          >
                            {service.title}
                          </NavLink>
                          <hr />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="col-md-9 ps-md-4 ps-3">
                <div className="position-relative">
                  {/* {/* only show loading skeleton while fetching data from api */}
                  {loading && (
                    <div
                      className="d-flex justify-content-center align-items-center"
                      style={{ minHeight: '400px' }}
                    >
                      <SkeletonLoader bars={3} width="8px" />
                    </div>
                  )}

                  {/* Loader Centered, only show content when not loading and service exists */}
                  {!loading && service && (
                    <>
                      {service.image && (
                        <img
                          src={`${fileUrl}/uploads/services/large/${service.image}`}
                          alt={service.title}
                          className="mb-4 w-100 shadow border-0"
                        />
                      )}

                      <h3 className="my-3">{service.title}</h3>

                      <div
                        className="content-description"
                        dangerouslySetInnerHTML={{ __html: service.content }}
                      />
                    </>
                  )}

                  {/*  No Data, only show empty state when not loading and no servies exist */}
                  {!loading && !service && (
                    <div
                      className="d-flex justify-content-center align-items-center"
                      style={{ minHeight: '400px' }}
                    >
                      No Data Found
                    </div>
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

export default ServiceDetail;
