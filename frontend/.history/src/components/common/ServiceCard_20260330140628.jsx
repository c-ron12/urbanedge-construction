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
              state={{ from: 'sidebar' }}   // This state is used in ServiceDetail.jsx to determine if the user came from sidebar within service detail page.
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
