import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useLocation } from 'react-router-dom'; // 1. Import useLocation
import logo from '../../assets/images/logo.png';

const Header = () => {
  const [scrolled, setScrolled] = React.useState(false);
  const location = useLocation(); // 2. Get the current location

  // 3. Helper function to determine if a link is active
  const isActive = (path) => {
    // 1. Exact match (e.g., Home, Contact)
    if (location.pathname === path) return true;

    // 2. Define "Detail Page" relationships
    // This says: "If I am on /service, keep /services active"
    const parentRoutes = {
      '/service': '/services',
      '/project': '/projects',
      '/blog': '/blogs',
    };

    // 3. Check if the current URL starts with any of our parent paths
    // Object.keys gives us ['/service', '/project', ...]
    const basePaths = Object.keys(parentRoutes);

    for (const base of basePaths) {
      if (location.pathname.startsWith(base)) {
        // If the current URL starts with '/service', return true for '/services'
        return path === parentRoutes[base];
      }
    }

    return false;
  };

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={scrolled ? 'sticky-active' : ''}>
      <div className="container-fluid px-4 py-1">
        <Navbar expand="lg">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Navbar.Brand
              as={NavLink}
              to="/"
              className="Logo"
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <img src={logo} alt="UrbanEdge Logo" width="75" height="50" />
              <div>
                <span className="pe-2">UrbanEdge</span>Construction
              </div>
            </Navbar.Brand>
          </div>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto mt-3 mt-lg-0">
              {/* Home */}
              <NavLink
                to="/"
                className={`nav-link ${isActive('/') ? 'active' : ''}`}
                end
              >
                Home
              </NavLink>

              {/* About */}
              <NavLink
                to="/about"
                className={`nav-link ${isActive('/about') ? 'active' : ''}`}
              >
                About Us
              </NavLink>

              {/* Services */}
              <NavLink
                to="/services"
                className={`nav-link ${isActive('/services') ? 'active' : ''}`}
              >
                Services
              </NavLink>

              {/* Projects */}
              <NavLink
                to="/projects"
                className={`nav-link ${isActive('/projects') ? 'active' : ''}`}
              >
                Projects
              </NavLink>

              {/* Blogs */}
              <NavLink
                to="/blogs"
                className={`nav-link ${isActive('/blogs') ? 'active' : ''}`}
              >
                Blogs
              </NavLink>

              {/* Contact */}
              <NavLink
                to="/contact"
                className={`nav-link ${isActive('/contact') ? 'active' : ''}`}
              >
                Contact Us
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </header>
  );
};

export default Header;
