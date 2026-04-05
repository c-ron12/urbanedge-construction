import Icon1 from '../../assets/images/icon-1.svg';
import Icon2 from '../../assets/images/icon-2.svg';
import Icon3 from '../../assets/images/icon-3.svg';


const WhyChooseUs = () => {
  return (
    <>
      <section className="section-4 pt-5 pb-md-4">
        <div className="container pt-lg-5 pt-3 pb-4">
          <div className="section-header text-center">
            <span>Why Choose Us</span>
            <h2>Excellence is Our Standard</h2>
            <p>
              We transform your vision with expert craftsmanship and dedicated
              care.
            </p>
          </div>

          <div className="row  justify-content-center pt-5">
            {/* Card 1 */}
            <div className="col-lg-4 col-md-6 mb-5 gx-5">
              <div className="card shadow border-0 p-4 h-100">
                <div className="card-icon text-center mb-3">
                  <img src={Icon1} alt="Quality Icon" />
                </div>
                <div className="card-body text-center">
                  <h3 className="card-title">Uncompromising Quality</h3>
                  <p className="card-text">
                    We use only the finest materials and adhere to the highest
                    standards of craftsmanship, ensuring a result that is not
                    only beautiful but built to endure for generations.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="col-lg-4 col-md-6 mb-5 gx-5">
              <div className="card shadow border-0 p-4 h-100">
                <div className="card-icon text-center mb-3">
                  <img src={Icon2} alt="Reliability Icon" />
                </div>
                <div className="card-body text-center">
                  <h3 className="card-title">On Time, On Budget</h3>
                  <p className="card-text">
                    Your project's timeline and budget are sacred to us. We
                    provide detailed plans and transparent communication to
                    guarantee a smooth process from groundbreaking to
                    completion.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="col-lg-4 col-md-6 mb-5 gx-5">
              <div className="card shadow border-0 p-4 h-100">
                <div className="card-icon text-center mb-3">
                  <img src={Icon3} alt="Expertise Icon" />
                </div>
                <div className="card-body text-center">
                  <h3 className="card-title">Expert Craftsmanship</h3>
                  <p className="card-text">
                    Our team brings years of experience and a passion for
                    precision to every job, skillfully navigating challenges to
                    transform your vision into a stunning reality.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WhyChooseUs;
