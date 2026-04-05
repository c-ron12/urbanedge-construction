import React from 'react';
import { AuthContext } from '../backend/context/Auth';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const { logout } = React.useContext(AuthContext);
  return (
    <>
      <div className="card shadow border-0 mb-4 mb-md-0">
        <div className="card-body p-4 sidebar">
          <h4 className="pb-3">SideBar</h4>
          <ul>
            <li>
              <Link to="/admin/dashboard">Dashboard</Link>
            </li>
            <hr />
            <li>
              <Link to="/admin/services">Services</Link>
            </li>
            <hr />
            <li>
              <Link to="/admin/projects">Projects</Link>
            </li>
            <hr />
            <li>
              <Link to="/admin/articles">Articles</Link>
            </li>
            <hr />
            <li>
              <Link to="/admin/members">Team Members</Link>
            </li>
            <hr />
            <li>
              <Link to="/admin/testimonials">Testimonials</Link>
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
