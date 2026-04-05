import { NavLink } from 'react-router-dom';
import { fileUrl } from './http';

// This is the same "service" passed in the map function in LatestServices.jsx.
const ServiceCard = ({ service }) => {
  return (
    <>
      <div className="col-lg-3 col-sm-6 pb-5">
        <div className="item ">
          <div className="service-image">
            {service.image && (
              <img
                src={`${fileUrl}/uploads/services/small/${service.image}`}
                className="w-100"
                alt={service.title}
              />
            )}
          </div>

          <div className="service-body">
            <div className="service-title">
              <h3>{service.title}</h3>
            </div>

            <div className="service-content">
              <p>{service.short_desc}</p>
            </div>

            <NavLink
              to={`/service/${service.id}`}
              state={{ from: 'external' }}   // This state is used in ServiceDetail.jsx to determine if the user came from an external page (like LatestServices) or from the sidebar within ServiceDetail. If it's 'external', we scroll to top when they click on Read More Button of ServiceCard. If it's from sidebar of ServiceDetail page, we don't scroll to top because they are already on the service detail page.
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

export default ServiceCard;
