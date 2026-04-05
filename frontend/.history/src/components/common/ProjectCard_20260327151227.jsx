import { NavLink } from 'react-router-dom';
import { fileUrl } from './http';

// This is the same "project" passed in the map function in LatestProjects.jsx.
const ProjectCard = ({ project }) => {
  return (
    <>
      <div className="col-lg-3 col-sm-6 pb-5">
        <div className="item">
          <div className="service-image">
            {project.image && (
              <img
                src={`${fileUrl}/uploads/projects/small/${project.image}`}
                className="w-100"
                alt={project?.title}
              />
            )}
          </div>
          <div className="service-body">
            <div className="service-title">
              <h3>{project.title}</h3>
            </div>
            <div className="service-content">
              <p>{project.short_desc}</p>
            </div>
            <NavLink
              to={`/project/${project.id}`}
              state={{ from: 'external' }}  // This state is used in ProjectDetail.jsx to determine if the user came from an external page (like LatestProjects) or from the sidebar within ProjectDetail. If it's 'external', we scroll to top when they click on Read More Button of ProjectCard. If it's from sidebar of ProjectDetail page, we don't scroll to top because they are already on the project detail page.
              className="btn btn-primary service-readmore-btn mt-4 small-btn"
            >
              Read More
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectCard;
