import React from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Banner from '../common/Banner';
import BannerImg from '../../assets/images/banner2.jpg';
import { apiUrl, fileUrl } from '../common/http';
import { useParams, Link } from 'react-router-dom';
import Testimonials from '../common/LatestTestimonials';

const ServiceDetail = () => {
  const params = useParams();

  const [service, setService] = React.useState([]);
  const [services, setServices] = React.useState([]);

  const fetchServices = async () => {
    const res = await fetch(`${apiUrl}/get-services/`, {
      method: 'GET',
    });
    const result = await res.json();
    setServices(result.data); // Changed: set the array to 'services'
  };

  const fetchService = async () => {
    const res = await fetch(`${apiUrl}/get-service/${params.id}`, {
      method: 'GET',
    });
    const result = await res.json();
    setService(result.data); // Changed: set the single object to 'service'
  };

  // Fetch service when component mounts
  React.useEffect(() => {
    fetchService();
    fetchServices();
  }, []);

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
        <section className="section-9">
          <div className="container py-5">
            <div className="row bg-light">
              <div className="col-md-3">
                <div className="card shadow border-0 sidebar-card">
                  <div className="card-body px-4 py-4">
                    <h3 className="mt-2 mb-3">Our Services</h3>
                    <ul className="list-unstyled ">
                      {services.map((service) => {
                        return (
                          <li key={service.id}>
                            <Link
                              to={`/service/${service.id}`}
                              className="text-decoration-none service-link"
                            >
                              {service.title}
                              <hr />
                            </Link>
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
                    src={`${fileUrl}/uploads/services/large/${service?.image}`}
                    alt={service?.title}
                    className="mb-4 w-100"
                  />
                  <h3 className="mb-3">{service?.title}</h3>
                  <div>
                    <div
                      dangerouslySetInnerHTML={{ __html: service?.content }}
                    />
                  </div>
                </div>
              </div>
            </div>
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
