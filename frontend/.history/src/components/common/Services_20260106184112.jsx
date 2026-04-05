import React from 'react';
import { apiUrl, fileUrl } from './http';

const Services = () => {

   const [services, setServices] = React.useState([]);

   // Api call to fetch latest 4 services
   const fetchLatestServices = async () => {
     const res = await fetch(`${apiUrl}/get-latest-services?limit=4`, {
       method: 'GET',
     });

     const result = await res.json();
     console.log(result);
     setServices(result.data);
   };

   React.useEffect(() => {
     fetchLatestServices();
   }, []);

  return (
    <section className="section-3 bg-light pt-5 pb-md-4">
      <div className="container-fluid pt-lg-5 pt-3 pb-4">
        <div className="section-header text-center">
          <span>Our Services</span>
          <h2>Our Construction Services</h2>
          <p>
            We offer a diverse array of construction services, spanning
            residential, commercial, and industrial projects.
          </p>
        </div>

        <div className="row pt-5">
          {services && services.map((service) => {
            return (
              <div key={service.id} className="col-lg-3 col-sm-6 pb-5">
                <div className="item">
                  <div className="service-image">
                    <img
                      src={`${fileUrl}/uploads/services/small/${service.image}`}
                      className="w-100"
                      alt="Custom Home Construction"
                    />
                  </div>
                  <div className="service-body">
                    <div className="service-title">
                      <h3>{service.title}</h3>
                    </div>
                    <div className="service-content">{service.description}</div>
                    <a
                      href="#"
                      className="btn btn-primary service-readmore-btn mt-4 small-btn"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            ); 
         })}

        </div>
      </div>
    </section>
  );
};

export default Services;
