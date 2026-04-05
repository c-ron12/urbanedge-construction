import { Link } from 'react-router-dom';
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
            <Link
              to={`/project/${project.id}`}
              className="btn btn-primary service-readmore-btn mt-4 small-btn"
            >
              Read More
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectCard;
