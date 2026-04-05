import React from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Banner from '../common/Banner';
import BannerImg from '../../assets/images/banner2.jpg';
import { apiUrl, fileUrl } from '../common/http';
import { useParams, NavLink } from 'react-router-dom';
import Testimonials from '../common/LatestTestimonials';
import SkeletonLoader from '../common/SkeletonLoader';
import { useLocation, NavLink} from 'react-router-dom';

const ServiceDetail = () => {
  const params = useParams();
  const location = useLocation(); // To check if user came from external page or from sidebar within service detail page.

  const [service, setService] = React.useState(null);
  const [services, setServices] = React.useState([]);

  const fetchServices = async () => {
    const res = await fetch(`${apiUrl}/get-services/`, {
      method: 'GET',
    });
    const result = await res.json();
    setServices(result.data);
  };

  const fetchService = async () => {
    const res = await fetch(`${apiUrl}/get-service/${params.id}`, {
      method: 'GET',
    });
    const result = await res.json();
    setService(result.data);
  };

  // Fetch service when component mounts
  React.useEffect(() => {
    if (location.state?.from === 'external') {
      window.scrollTo(0, 0); // If user came from external page (like Services page) then scroll to top, because they might be in middle of the page when they click on a service. But if they are clicking on service from sidebar of ServiceDetail page, we don't scroll to top because they are already on the service detail page.
    }
    fetchService();
    fetchServices();
  }, [params.id]); // Added params.id as a dependency to refetch when the id changes, means when user clicks on another service from sidebar, it will fetch that service details.

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

        {/* SKELETON (ONLY WHEN LOADING) */}
        {!service && (
          <div className="container">
            <SkeletonLoader bars={3} width="8px" />
          </div>
        )}

        {service && (
          <section className="section-9 pt-lg-5 pt-4 pb-2">
            <div className="container py-5">
              <div className="row">
                <div className="col-md-3 mb-5 mb-md-0">
                  <div className="card shadow border-0 sidebar-card">
                    <div className="card-body px-4 py-4">
                      <h3 className="mt-2 mb-3">Our Services</h3>
                      <ul
                        className="list-unstyled scrollable-list"
                        style={{ fontSize: '17px' }}
                      >
                        {services.map((service) => {
                          return (
                            <li key={service.id}>
                              <NavLink
                                to={`/service/${service.id}`}
                                className="text-decoration-none link-item"
                              >
                                {service.title}
                              </NavLink>
                              <hr />
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="col-md-9 ps-md-4 ps-0 pe-0">
                  <div>
                    {service.image && (
                      <img
                        src={`${fileUrl}/uploads/services/large/${service.image}`}
                        alt={service.title}
                        className="mb-4 w-100 shadow border-0"
                      />
                    )}
                    <h3 className="my-3">{service.title}</h3>
                    <div>
                      <div
                        className="content-description"
                        dangerouslySetInnerHTML={{ __html: service.content }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <section className="section-10">
        <div className="container-fluid bg-light">
          <div className="row">
            <div className="col-md-12">
              <Testimonials />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default ServiceDetail;
