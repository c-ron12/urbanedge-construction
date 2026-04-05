import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './assets/css/style.scss';
import Home from './components/frontend/Home';
import About from './components/frontend/About';
import Services from './components/frontend/Services';
import Projects from './components/frontend/Projects';
import Blogs from './components/frontend/Blogs';
import Contact from './components/frontend/Contact';
import ServiceDetail from './components/frontend/ServiceDetail';

import Login from './components/backend/login';
import { ToastContainer, toast } from 'react-toastify'; // for toast notifications.
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './components/backend/Dashboard';

import RequireAuth from './components/common/RequireAuth'; // to protect admin routes.
import { default as ShowServices } from './components/backend/services/Show'; // renamed import to avoid conflict with Services component.
import { default as CreateService } from './components/backend/services/Create'; // renamed import to avoid conflict with Services component.
import { default as EditService } from './components/backend/services/Edit'; // renamed import to avoid conflict with Services component.

import { default as ShowProjects } from './components/backend/projects/Show';
import { default as CreateProject } from './components/backend/projects/Create';
import { default as EditProject } from './components/backend/projects/Edit';

import { default as ShowArticles } from './components/backend/articles/Show';
import { default as CreateArticle } from './components/backend/articles/Create';
import { default as EditArticle } from './components/backend/articles/Edit';

import { default as ShowTestimonials } from './components/backend/testimonials/Show';
import { default as CreateTestimonial } from './components/backend/testimonials/Create';
import { default as EditTestimonial } from './components/backend/testimonials/Edit';

import { default as ShowMembers } from './components/backend/members/Show';
import { default as CreateMembers } from './components/backend/members/Create';
import { default as EditMember } from './components/backend/members/Edit';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/admin/login" element={<Login />} />
          <Route
            path="/admin/dashboard"
            element={
              <RequireAuth>
                <Dashboard />{' '}
                {/* This is children component and it is being received from RequireAuth.jsx children props*/}
              </RequireAuth>
            }
          />

          <Route
            path="/admin/services"
            element={
              <RequireAuth>
                <ShowServices />
              </RequireAuth>
            }
          />

          <Route
            path="/admin/services/create"
            element={
              <RequireAuth>
                <CreateService />
              </RequireAuth>
            }
          />

          <Route
            path="/admin/services/edit/:id"
            element={
              <RequireAuth>
                <EditService />
              </RequireAuth>
            }
          />

          <Route
            path="/admin/projects"
            element={
              <RequireAuth>
                <ShowProjects />
              </RequireAuth>
            }
          />

          <Route
            path="/admin/projects/create"
            element={
              <RequireAuth>
                <CreateProject />
              </RequireAuth>
            }
          />

          <Route
            path="/admin/projects/edit/:id"
            element={
              <RequireAuth>
                <EditProject />
              </RequireAuth>
            }
          />

          <Route
            path="/admin/articles"
            element={
              <RequireAuth>
                <ShowArticles />
              </RequireAuth>
            }
          />

          <Route
            path="/admin/articles/create"
            element={
              <RequireAuth>
                <CreateArticle />
              </RequireAuth>
            }
          />

          <Route
            path="/admin/articles/edit/:id"
            element={
              <RequireAuth>
                <EditArticle />
              </RequireAuth>
            }
          />

          <Route
            path="/admin/testimonials"
            element={
              <RequireAuth>
                <ShowTestimonials />
              </RequireAuth>
            }
          />

          <Route
            path="/admin/testimonials/create"
            element={
              <RequireAuth>
                <CreateTestimonial />
              </RequireAuth>
            }
          />

          <Route
            path="/admin/testimonials/edit/:id"
            element={
              <RequireAuth>
                <EditTestimonial />
              </RequireAuth>
            }
          />

          <Route
            path="/admin/members"
            element={
              <RequireAuth>
                <ShowMembers />
              </RequireAuth>
            }
          />

          <Route
            path="/admin/members/create"
            element={
              <RequireAuth>
                <CreateMembers />
              </RequireAuth>
            }
          />

          <Route
            path="/admin/members/edit/:id"
            element={
              <RequireAuth>
                <EditMember />
              </RequireAuth>
            }
          />
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}

export default App;
