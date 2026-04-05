import React from 'react';
import { apiUrl } from './http';
import ServiceCard from './ServiceCard';

// SHOW LATEST SERVICE ON HOME PAGE.
const LatestServices = () => {

   const [services, setServices] = React.useState([]);

   // Api call to fetch latest 4 services.
   const fetchLatestServices = async () => {
     const res = await fetch(`${apiUrl}/get-latest-services?limit=4`, {
       method: 'GET',
     });

     const result = await res.json();
     console.log(result);
     setServices(result.data);   // data is coming from backend api response latestServices function of ServicesController.
   };

   React.useEffect(() => {
     fetchLatestServices();
   }, []);

  return (
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

        <ServiceCard services={services} />
      </div>
    </section>
  );
};

export default LatestServices;
