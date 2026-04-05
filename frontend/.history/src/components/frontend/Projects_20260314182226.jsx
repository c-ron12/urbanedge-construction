import React from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Banner from '../common/Banner';
import Testimonials from '../common/LatestTestimonials';
import ProjectBanner from '../../assets/images/construction2.jpg';

import ProjectCard from '../common/ProjectCard';
import { apiUrl } from '../common/http';

// SHOW ALL PROJECTS ON PROJECTS PAGE.
const Projects = () => {
  const [projects, setProjects] = React.useState([]);

  // Api call to fetch all projects.
  const fetchAllProjects = async () => {
    const res = await fetch(`${apiUrl}/get-projects`, {
      method: 'GET',
    });

    const result = await res.json();
    console.log(result);
    setProjects(result.data); // data is coming from backend api response index function of frontend/ProjectsController.
  };

  React.useEffect(() => {
    fetchAllProjects();
  }, []);

  return (
    <>
      <Header />
      <main>
        <Banner
          heading={
            'Projects That Define Us and Reflect <br /> Our Commitment to Excellence'
          }
          text={
            'Each project we complete stands as a proud testament to our craftsmanship, <br /> technical expertise, and long-term vision for excellence.'
          }
          bgImage={ProjectBanner}
        />
      </main>

      {/* Render a ProjectCard for each project */}
      <div className="row pt-5">
        {projects.map((project) => (
          // "project" is a single project object passed as a prop to ProjectCard
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      <Testimonials />

      <Footer />
    </>
  );
};

export default Projects;
