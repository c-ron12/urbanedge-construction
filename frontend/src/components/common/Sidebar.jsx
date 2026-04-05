import React from 'react';
import { AuthContext } from '../backend/context/Auth';
import { NavLink } from 'react-router-dom'; // Keep using NavLink

const Sidebar = () => {
  const { logout } = React.useContext(AuthContext);
  return (
    <>
      <div className="card shadow border-0 mb-4 mb-md-0">
        <div className="card-body p-4 sidebar">
          <h4 className="pb-3">SideBar</h4>
          <ul>
            <li>
              <NavLink
                to="/admin/dashboard"
                className="sidebar-link" // Add a consistent class
                end // Optional: if you want exact matching for dashboard
              >
                Dashboard
              </NavLink>
            </li>
            <hr />
            <li>
              <NavLink to="/admin/services" className="sidebar-link">
                Services
              </NavLink>
            </li>
            <hr />
            <li>
              <NavLink to="/admin/projects" className="sidebar-link">
                Projects
              </NavLink>
            </li>
            <hr />
            <li>
              <NavLink to="/admin/articles" className="sidebar-link">
                Articles
              </NavLink>
            </li>
            <hr />
            <li>
              <NavLink to="/admin/members" className="sidebar-link">
                Team Members
              </NavLink>
            </li>
            <hr />
            <li>
              <NavLink to="/admin/testimonials" className="sidebar-link">
                Testimonials
              </NavLink>
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
