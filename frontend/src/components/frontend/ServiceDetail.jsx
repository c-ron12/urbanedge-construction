import React from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Banner from '../common/Banner';
import BannerImg from '../../assets/images/banner2.jpg';
import { apiUrl, fileUrl } from '../common/http';
import Testimonials from '../common/LatestTestimonials';
import SkeletonLoader from '../common/SkeletonLoader';
import { useParams, NavLink, useLocation } from 'react-router-dom';
import EmptyState from '../common/EmptyState'; // Reusable component to show empty state when no service is found.
import useFetch from '../../hooks/useFetch'; // Reusable hook to fetch data from API

const ServiceDetail = () => {
  const params = useParams(); // To get the service id from the url. This id is used to fetch the service details from the backend.
  const location = useLocation(); // Determine navigation source via location.state.from  (external: Home Page/Latest Services section, Service page or global footer except ServiceDetail page; internal sidebar/footer of ServiceDetail page)

  const [services, setServices] = React.useState([]);
  const sectionRef = React.useRef(null); // Reference to section element; used to scroll into view when navigation from external page or internal page.

  // Api call to fetch all services for sidebar.
  const fetchServices = async () => {
    try {
      const res = await fetch(`${apiUrl}/get-services/`);

      if (!res.ok) {
        throw new Error('SERVER_ERROR');
      }

      // Converts JSON (string) response body into JavaScript object.
      // Throws if response is not valid JSON (caught in catch, but not as 'INVALID_RESPONSE' unless rethrown)
      const result = await res.json();

      if (!result || !Array.isArray(result.data)) {
        throw new Error('INVALID_RESPONSE');
      }

      setServices(result.data);
    } catch (error) {
      console.error('Fetch services error:', error);
      setServices([]); // safe fallback in case of error to avoid infinite loading skeleton bug in sidebar and to show empty state in sidebar instead of loading skeleton.
    }
  };

  // use hook to manage all state and fetch service details.
  const {
    data: service,
    loading,
    error,
  } = useFetch(`${apiUrl}/get-service/${params.id}`, false); // use false to fetch single service instead of array(list) of services.

  React.useEffect(() => {
    if (location.state?.from === 'external') {
      window.scrollTo(0, 0); // If user came from external page like Home page or Service page then scroll to top, because they might be in middle or end of the page when they click on a particluar service . But if they are clicking on service from sidebar of ServiceDetail page, we don't scroll to top because they are already on the service detail page.
    } else if (location.state?.from === 'footer') {
      sectionRef.current?.scrollIntoView(); // Scroll the page until this section is visible, <section className="section-9 pt-4 pt-sm-5 pb-2 pb-sm-4" ref={sectionRef}>
    } else if (location.state?.from === 'sidebar') {
      sectionRef.current?.scrollIntoView();
    }

    fetchServices();
  }, [params.id]); // Added params.id as a dependency to refetch when the id changes, means when user clicks on another service from sidebar, it will fetch that service details.

  return (
    <>
      <Header />

      <main style={{ marginTop: '80px' }}>
        <Banner
          heading={'Shaping Tomorrows <br /> Structures Today'}
          title={service?.title || ''}
          text={''}
          bgImage={BannerImg}
        />

        <section
          className="section-9 pt-4 pt-sm-5 pb-2 pb-sm-4"
          ref={sectionRef}
        >
          <div className="container pt-lg-5 pt-4 pb-3">
            <div className="row">
              {/* Sidebar */}
              <div className="col-md-3 mb-5 mb-md-0 ">
                <div className="card shadow border-0 sidebar-card">
                  <div className="card-body p-lg-4 p-3">
                    <h3 className="mt-2 mb-3">Our Services</h3>
                    <ul className="list-unstyled scrollable-list">
                      {services.map((service) => (
                        <li key={service.id}>
                          <NavLink
                            to={`/service/${service.id}`}
                            state={{ from: 'sidebar' }}
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
              <div className="col-md-9 ps-md-4">
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
                          alt={service?.title}
                          className="mb-4 w-100 shadow border-0"
                        />
                      )}

                      <h3 className="my-2">{service?.title}</h3>

                      <div
                        className="content-description"
                        dangerouslySetInnerHTML={{ __html: service.content }}
                      />
                    </>
                  )}

                  {/*  No Data, only show empty state when not loading and no servies exist */}
                  {!loading && !service && (
                    <EmptyState>
                      <h5>
                        {error ? 'Error loading service' : 'No data found'}
                      </h5>
                      <p className="text-muted mb-0">
                        {error || 'We couldn’t find this service.'}
                      </p>
                    </EmptyState>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <section className="section-10">
          <div className="container-fluid bg-light">
            <div className="row">
              <div className="col-md-12">
                <Testimonials />
              </div>
            </div>
          </div>
        </section> */}
      </main>

      <Footer />
    </>
  );
};

export default ServiceDetail;
