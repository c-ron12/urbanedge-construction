import React from 'react';
import { apiUrl } from './http';
import ServiceCard from './ServiceCard';

// SHOW LATEST SERVICES ON HOME PAGE.
const LatestServices = () => {
  const [services, setServices] = React.useState([]);

  // Api call to fetch latest 4 services.
  const fetchLatestServices = async () => {
    const res = await fetch(`${apiUrl}/get-latest-services?limit=4`);
    const result = await res.json();
    setServices(result.data);    // data is coming from backend api response latestServices function of frontend/ServicesController.
  };

  React.useEffect(() => {
    fetchLatestServices();
  }, []);

  return (
    <>
      <section className="section-3 bg-light pt-5 pb-md-4">
        <div className="container-fluid pt-lg-5 pt-3 pb-4">
          <div className="section-header text-center">
            <span>Our Services</span>
            <h2>Our Construction Services</h2>
            <p>
              We offer a diverse array of construction services, spanning
              residential, commercial, and industrial projects.
            </p>
          </div>

          <div className="row pt-5">
            {services.map((service) => (
              // The "service" prop here is sent to ServiceCard.jsx.
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default LatestServices;
