import React from 'react';
import { apiUrl } from './http';
import ServiceCard from './ServiceCard';
import SkeletonLoader from '../common/SkeletonLoader';

// SHOW LATEST SERVICES ON HOME PAGE.
const LatestServices = () => {
  const [services, setServices] = React.useState([]);
  const [loading, setLoading] = React.useState(true);  // To show loading skeleton while fetching data from api.

  // Api call to fetch latest 4 services.
  const fetchLatestServices = async () => {
    try {
      const res = await fetch(`${apiUrl}/get-latest-services?limit=4`);
      const result = await res.json();
      setServices(result.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // always stop loading
    }
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
          {/* Loading */}
          {loading && (
            <div className="container">
              <SkeletonLoader bars={3} width="8px" />
            </div>
          )}

          {!loading && services.length > 0 && (
            <div className="row pt-5">
              {services.map((service) => (
                // The "service" prop here is sent to ServiceCard.jsx.
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && services.length === 0 && (
            <p className="text-center pt-5">No services found</p>
          )}
        </div> 
      </section>
    </>
  );
};

export default LatestServices;
