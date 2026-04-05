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
          <Navbar.Brand
            as={Link}
            to="/"
            className="Logo d-flex align-items-center"
          >
            <img src={logo} alt="UrbanEdge Logo" width="75" height="50" />
            <div>
              <span className="pe-2">UrbanEdge</span>Construction
            </div>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/" active={currentPath === '/'}>
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/about" active={currentPath === '/about'}>
                About Us
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/services"
                active={currentPath.startsWith('/services')}
              >
                Services
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/projects"
                active={currentPath.startsWith('/projects')}
              >
                Projects
              </Nav.Link>
              <Nav.Link as={Link} to="/blogs" active={currentPath === '/blogs'}>
                Blogs
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/contact"
                active={currentPath === '/contact'}
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
