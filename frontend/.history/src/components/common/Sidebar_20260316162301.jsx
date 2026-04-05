import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { AuthContext } from '../backend/context/Auth';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const { logout } = React.useContext(AuthContext);
  return (
    <>
      <div className="card shadow border-0 mb-4 mb-md-0">
        <div className="card-body p-4 sidebar">
          <h4 className="pb-3">SideBar</h4>
          <ul>
            <li>
              <Nav.Link as={NavLink} to="/admin/dashboard">Dashboard</Nav.Link>
            </li>
            <hr />
            <li>
              <Nav.Link as={NavLink} to="/admin/services">Services</Nav.Link>
            </li>
            <hr />
            <li>
              <Nav.Link as={NavLink} to="/admin/projects">Projects</Nav.Link>
            </li>
            <hr />
            <li>
              <Nav.Link as={NavLink} to="/admin/articles">Articles</Nav.Link>
            </li>
            <hr />
            <li>
              <Nav.Link as={NavLink} to="/admin/members">Team Members</Nav.Link>
            </li>
            <hr />
            <li>
              <Nav.Link as={NavLink} to="/admin/testimonials">Testimonials</Nav.Link>
            </li>
            <hr />

            <button onClick={logout} className="btn btn-primary mt-4">
              Logout
            </button>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
