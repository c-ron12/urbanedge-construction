import React from 'react';
import { Link } from 'react-router-dom';
import { apiUrl } from './http';

const Footer = () => {
  const [services, setServices] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  // Fetch latest 4 services for footer
  const fetchFooterServices = async () => {
    try {
      const res = await fetch(`${apiUrl}/get-latest-services?limit=4`);
      const result = await res.json();
      setServices(result.data);
    } catch (error) {
      console.log('Footer services error:', error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchFooterServices();
  }, []);

  return (
    <footer>
      <div className="container pt-5 pb-3">
        <div className="row">
          {/* Column 1 */}
          <div className="col-md-3">
            <h3>
              UrbanEdge <br /> Constructions
            </h3>
            <p>
              Our post-construction services <br />
              gives you peace of mind knowing that we are still here for you
              even after project completion.
            </p>
          </div>

          {/* Column 2 - Dynamic Services */}
          <div className="col-md-3 mt-4 mt-md-0 ps-md-5">
            <h3>Our Services</h3>

            <ul className="list-unstyled">
              {/* Loading, only show loading skeleton while fetching data from api */}
              {loading && (
                <div className="container">
                  <SkeletonLoader bars={3} width="8px" />
                </div>
              )}

              {/* Services List */}
              {!loading &&
                services.length > 0 &&
                services.map((service) => (
                  <li key={service.id}>
                    <Link to={`/service/${service.slug}`}>{service.title}</Link>
                  </li>
                ))}

              {/* Empty State */}
              {!loading && services.length === 0 && (
                <li>No services available</li>
              )}
            </ul>
          </div>

          {/* Column 3 */}
          <div className="col-md-3 mt-4 mt-md-0 ps-md-5">
            <h3>Quick Links</h3>
            <ul className="list-unstyled">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/services">Services</Link>
              </li>
              <li>
                <Link to="/projects">Projects</Link>
              </li>
              <li>
                <Link to="/blogs">Blogs</Link>
              </li>
            </ul>
          </div>

          {/* Column 4 */}
          <div className="col-md-3 mt-4 mt-md-0">
            <h3>Contact Us</h3>
            <p>+977 9825683489</p>
            <p>info@example.com</p>
            <p>Devinagar-10, Mid Baneshwor, Kathmandu</p>
          </div>
        </div>

        <hr />

        <div className="text-center pt-3">
          <p>&copy; 2024 UrbanEdge Constructions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
