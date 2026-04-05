import React from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Banner from '../common/Banner';
import ServiceCard from '../common/ServiceCard'; // Reusable card component for each service
import BannerImg from '../../assets/images/banner2.jpg';
import { apiUrl } from '../common/http';

// SHOW ALL SERVICES ON SERVICES PAGE
const Services = () => {
  // State to store all services fetched from backend
  const [services, setServices] = React.useState([]);
  const [loading, setLoading] = React.useState(true); // To show loading skeleton while fetching data from api.

  const fetchAllServices = async () => {
    try {
      const res = await fetch(`${apiUrl}/get-services`);
      const result = await res.json();
      setServices(result.data); // data is coming from backend API response from MemberController, index()
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // always stop loading
    }
  };

  // Fetch all services when component mounts
  React.useEffect(() => {
    fetchAllServices();
  }, []);

  return (
    <>
      <Header />

      <Banner
        heading={'Shaping Tomorrows <br /> Structures Today'}
        text={
          'Our expert team blends innovation and craftsmanship to construct projects that stand the test of time, <br /> inspire progress, and reflect our unwavering commitment to quality and excellence.'
        }
        bgImage={BannerImg}
      />

      {/* Services list section */}
      <section className="section-3 bg-light pt-5 pb-md-4">
        <div className="container-fluid pt-lg-5 pt-3 pb-4">
          <div className="section-header text-center">
            <span>Our Services</span>
            <h2>All Construction Services</h2>
            <p>
              Explore our complete range of construction services, including
              residential, commercial, and industrial projects.
            </p>
          </div>

          {/* only show loading skeleton while fetching data from api */}
          {loading && (
            <div className="container">
              <SkeletonLoader bars={3} width="8px" />
            </div>
          )}

          {/* Only show services when not loading and services exist */}
          {!loading && services.length > 0 && (
            <div className="row pt-5 justify-content-center gy-5">
              {/* Render a ServiceCard for each service */}
              {services.map((service) => (
                // "service" is a single service object passed as a prop to ServiceCard
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          )}

          {/* only show empty state when not loading and no services exist */}
          {!loading && services.length === 0 && (
            <p className="text-center pt-5">No services found</p>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Services;
