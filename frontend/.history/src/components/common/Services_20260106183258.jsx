import React from 'react';
import ServiceImg1 from '../../assets/images/construction1.jpg';
import ServiceImg2 from '../../assets/images/construction2.jpg';
import ServiceImg3 from '../../assets/images/construction3.jpg';
import ServiceImg4 from '../../assets/images/construction4.jpg';


const Services = () => {

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
          {/* Service Item 1 */}
          <div className="col-lg-3 col-sm-6 pb-5">
            <div className="item">
              <div className="service-image">
                <img
                  src={ServiceImg1}
                  className="w-100"
                  alt="Custom Home Construction"
                />
              </div>
              <div className="service-body">
                <div className="service-title">
                  <h3>Custom Home Constructions</h3>
                </div>
                <div className="service-content">
                  Creating the perfect home for you is our passion. With our
                  Custom Home Constructions service, we bring your unique vision
                  to life.
                </div>
                <a
                  href="#"
                  className="btn btn-primary service-readmore-btn mt-4 small-btn"
                >
                  Read More
                </a>
              </div>
            </div>
          </div>

          {/* Service Item 2 */}
          <div className="col-lg-3 col-sm-6 pb-5">
            <div className="item">
              <div className="service-image">
                <img
                  src={ServiceImg2}
                  className="w-100"
                  alt="Commercial Building"
                />
              </div>
              <div className="service-body">
                <div className="service-title">
                  <h3>Renovation & Remodeling</h3>
                </div>
                <div className="service-content">
                  We construct state-of-the-art commercial spaces that are both
                  functional and aesthetically pleasing, tailored to your
                  business needs.
                </div>
                <a
                  href="#"
                  className="btn btn-primary service-readmore-btn mt-4 small-btn"
                >
                  Read More
                </a>
              </div>
            </div>
          </div>

          {/* Service Item 3 */}
          <div className="col-lg-3 col-sm-6 pb-5">
            <div className="item">
              <div className="service-image">
                <img
                  src={ServiceImg3}
                  className="w-100"
                  alt="Renovation Project"
                />
              </div>
              <div className="service-body">
                <div className="service-title">
                  <h3>Commercial Constructions</h3>
                </div>
                <div className="service-content">
                  Transform your existing space. Our team excels at remodeling
                  and renovation projects, breathing new life into any property.
                </div>
                <a
                  href="#"
                  className="btn btn-primary service-readmore-btn mt-4 small-btn"
                >
                  Read More
                </a>
              </div>
            </div>
          </div>

          {/* Service Item 4 */}
          <div className="col-lg-3 col-sm-6 pb-5">
            <div className="item">
              <div className="service-image">
                <img
                  src={ServiceImg4}
                  className="w-100"
                  alt="Industrial Construction"
                />
              </div>
              <div className="service-body">
                <div className="service-title">
                  <h3>Sustainable Building Solutions</h3>
                </div>
                <div className="service-content">
                  Specializing in large-scale industrial construction, we
                  deliver robust and efficient facilities built to the highest
                  standards.
                </div>
                <a
                  href="#"
                  className="btn btn-primary service-readmore-btn small-btn mt-4"
                >
                  Read More
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
