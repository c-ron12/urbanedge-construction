import { NavLink, Link } from 'react-router-dom';

const Footer = () => {
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

          {/* Column 2 - Services (ID BASED LINKS) */}
          <div className="col-md-3 mt-4 mt-md-0 ps-md-5">
            <h3>Our Services</h3>
            <ul className="list-unstyled">
              <li>
                <NavLink to="/service/20" state={{ from: 'footer' }}>
                  Custom Home Construction
                </NavLink>
              </li>
              <li>
                <NavLink to="/service/17" state={{ from: 'footer' }}>Renovation and Remodeling</NavLink>
              </li>
              <li>
                <NavLink to="/service/18" state={{ from: 'footer' }}>Commercial Constructions</NavLink>
              </li>
              <li>
                <NavLink to="/service/19" state={{ from: 'footer' }}>
                  Sustainable Building Solution
                </NavLink>
              </li>
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
