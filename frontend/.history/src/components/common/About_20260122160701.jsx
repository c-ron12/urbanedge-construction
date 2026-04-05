import AboutImg from '../../assets/images/about-us.jpg';

const About = () => {
  return (
    // About Us Section.
    <section className="section-2 pt-5 pb-md-4 pb-3">
      <div className="container pt-lg-5 pt-4 pb-4">
        <div className="row">
          <div className="col-lg-6">
            <img src={AboutImg} className="w-100" alt="About Us" />
          </div>

          <div className="col-lg-6 px-4 pt-5 pt-lg-0">
            
            <span>About Us</span>

            <h2>Crafting structures that last a lifetime</h2>
            <p>
              Building enduring structures requires a comprehensive approach
              that combines advanced materials, resilient design, routine
              maintenance, and sustainable practices. By drawing on historical
              insights and utilizing modern technology.
            </p>

            <p>
              Designing structures that stand the test of time involves a
              seamless blend of cutting-edge materials, durable design, ongoing
              upkeep, and eco-friendly practices. By combining lessons from the
              past with the power of modern technology.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
