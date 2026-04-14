import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import { Link } from 'react-router-dom';   // Used NavLink instead of Link for active Nav Menu item styling.
import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

{
  /* Header component with bgClass prop to set background color, used in backend pages to differentiate from frontend. */
}
const Header = ({ bgClass = '' }) => {
  return (
    <header className={bgClass}>
      {/* bgClass is a prop that allows us to pass a CSS class, in this case, no css property is used, but in backend pages we pass "bg-light" to add light background to header. */}

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
              <NavLink to="/" className="nav-link" end>
                Home
              </NavLink>
              <NavLink to="/about" className="nav-link">
                About Us
              </NavLink>
              <NavLink to="/services" className="nav-link">
                Services
              </NavLink>
              <NavLink to="/projects" className="nav-link">
                Projects
              </NavLink>
              <NavLink to="/blogs" className="nav-link">
                Blogs
              </NavLink>
              <NavLink to="/contact" className="nav-link">
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
