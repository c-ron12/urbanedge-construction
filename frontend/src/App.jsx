import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './assets/css/style.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Frontend imports...
import Home from './components/frontend/Home';
import About from './components/frontend/About';
import Services from './components/frontend/Services';
import Projects from './components/frontend/Projects';
import Blogs from './components/frontend/Blogs';
import Contact from './components/frontend/Contact';
import ServiceDetail from './components/frontend/ServiceDetail';
import ProjectDetail from './components/frontend/ProjectDetail';
import BlogDetail from './components/frontend/BlogDetail';
import ScrollToTopOnRouteChange from './components/common/ScrollToTopOnRouteChange';
import ScrollToTopButton from './components/common/ScrollToTopButton';

// Admin imports...
import Login from './components/backend/login';
import Dashboard from './components/backend/Dashboard';
import RequireAuth from './components/common/RequireAuth';
import { default as ShowServices } from './components/backend/services/Show';
import { default as CreateService } from './components/backend/services/Create';
import { default as EditService } from './components/backend/services/Edit';
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
import DeletedData from './components/common/DeletedData';

function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTopOnRouteChange />
        <ScrollToTopButton />
        <Routes>
          {/* --- Public Frontend Routes --- */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/service/:id" element={<ServiceDetail />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="/blog/:id" element={<BlogDetail />} />

          {/* --- Admin Routes --- */}
          <Route path="/admin">
            <Route path="login" element={<Login />} />

            {/* Protected Admin Routes */}
            <Route
              path=""
              element={
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              }
            />
            <Route
              path="dashboard"
              element={
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              }
            />

            {/* Generic Trashed/Deleted Route */}
            <Route
              path=":resource/trash"
              element={
                <RequireAuth>
                  <DeletedData />
                </RequireAuth>
              }
            />

            {/* Services */}
            <Route
              path="services"
              element={
                <RequireAuth>
                  <ShowServices />
                </RequireAuth>
              }
            />
            <Route
              path="services/create"
              element={
                <RequireAuth>
                  <CreateService />
                </RequireAuth>
              }
            />
            <Route
              path="services/edit/:id"
              element={
                <RequireAuth>
                  <EditService />
                </RequireAuth>
              }
            />

            {/* Projects */}
            <Route
              path="projects"
              element={
                <RequireAuth>
                  <ShowProjects />
                </RequireAuth>
              }
            />
            <Route
              path="projects/create"
              element={
                <RequireAuth>
                  <CreateProject />
                </RequireAuth>
              }
            />
            <Route
              path="projects/edit/:id"
              element={
                <RequireAuth>
                  <EditProject />
                </RequireAuth>
              }
            />

            {/* Articles */}
            <Route
              path="articles"
              element={
                <RequireAuth>
                  <ShowArticles />
                </RequireAuth>
              }
            />
            <Route
              path="articles/create"
              element={
                <RequireAuth>
                  <CreateArticle />
                </RequireAuth>
              }
            />
            <Route
              path="articles/edit/:id"
              element={
                <RequireAuth>
                  <EditArticle />
                </RequireAuth>
              }
            />

            {/* Testimonials */}
            <Route
              path="testimonials"
              element={
                <RequireAuth>
                  <ShowTestimonials />
                </RequireAuth>
              }
            />
            <Route
              path="testimonials/create"
              element={
                <RequireAuth>
                  <CreateTestimonial />
                </RequireAuth>
              }
            />
            <Route
              path="testimonials/edit/:id"
              element={
                <RequireAuth>
                  <EditTestimonial />
                </RequireAuth>
              }
            />

            {/* Members */}
            <Route
              path="members"
              element={
                <RequireAuth>
                  <ShowMembers />
                </RequireAuth>
              }
            />
            <Route
              path="members/create"
              element={
                <RequireAuth>
                  <CreateMembers />
                </RequireAuth>
              }
            />
            <Route
              path="members/edit/:id"
              element={
                <RequireAuth>
                  <EditMember />
                </RequireAuth>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>

      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}

export default App;
