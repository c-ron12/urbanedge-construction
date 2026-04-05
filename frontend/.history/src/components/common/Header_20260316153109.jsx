import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

const Header = () => {
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
              {/* end ensures '/' only matches exactly the home page */}
              <Nav.Link as={NavLink} to="/" end>
                Home
              </Nav.Link>

              <Nav.Link as={NavLink} to="/about">
                About Us
              </Nav.Link>

              <Nav.Link as={NavLink} to="/services">
                Services
              </Nav.Link>

              <Nav.Link as={NavLink} to="/projects">
                Projects
              </Nav.Link>

              <Nav.Link as={NavLink} to="/blogs">
                Blogs
              </Nav.Link>

              <Nav.Link as={NavLink} to="/contact">
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
