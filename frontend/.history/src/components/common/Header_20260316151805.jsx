import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

const Header = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <header>
      <div className="container-fluid px-4 py-1">
        <Navbar expand="lg">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Navbar.Brand
              as={Link}
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
            <Nav className="ms-auto">
              <Nav.Link
                as={Link}
                to="/"
                className={`nav-link ${currentPath === '/' ? 'active' : ''}`}
              >
                Home
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/about"
                className={`nav-link ${currentPath === '/about' ? 'active' : ''}`}
              >
                About Us
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/services"
                className={`nav-link ${currentPath === '/services' ? 'active' : ''}`}
              >
                Services
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/projects"
                className={`nav-link ${currentPath === '/projects' ? 'active' : ''}`}
              >
                Projects
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/blogs"
                className={`nav-link ${currentPath === '/blogs' ? 'active' : ''}`}
              >
                Blogs
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/contact"
                className={`nav-link ${currentPath === '/contact' ? 'active' : ''}`}
              >
                Contact Us
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </header>
  );
};

export default Header;
