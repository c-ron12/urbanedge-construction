import React from 'react';
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
              <NavLink to="/admin/dashboard">Dashboard</NavLink>
            </li>
            <hr />
            <li>
              <NavLink to="/admin/services">Services</NavLink>
            </li>
            <hr />
            <li>
              <NavLink to="/admin/projects">Projects</NavLink>
            </li>
            <hr />
            <li>
              <NavLink to="/admin/articles">Articles</NavLink>
            </li>
            <hr />
            <li>
              <NavLink to="/admin/members">Team Members</NavLink>
            </li>
            <hr />
            <li>
              <NavLink to="/admin/testimonials">Testimonials</NavLink>
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
