import Header from '../common/Header';
import Footer from '../common/Footer';
import Banner from '../common/Banner';
import ContactPic from '../../assets/images/contactPic.jpg';
import { useForm } from 'react-hook-form'; // Import the useForm hook from react-hook-form

const ContactUs = () => {

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },    
  } = useForm(); // Initialize the useForm hook from react-hook-form

  const onSubmit = async (data) => {
    console.log(data); // Log the form data to the console on form submission
     const res = await fetch('http://127.0.0.1:8000/api/contact', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json', // Tells the server the body of the request is JSON data.
       },
       body: JSON.stringify(data), // Converts the JavaScript object data into a JSON string to be sent as the request body.
     });
  }
  return (
    <>
      <main>
        <Header />

        <Banner
          heading={'We’re Here to Build Your Dreams'}
          text={
            'From planning to completion, we’re committed to delivering innovative </br /> solutions tailored to your project requirements.'
          }
          bgImage={ContactPic}
        />
      </main>

      <section className="section-8 pt-5 pb-md-4 bg-light">
        <div className="container pt-lg-5 pt-3 pb-4">
          {/* Section Header */}
          <div className="section-header text-center">
            <span>Contact Us</span>
            <h2>Get in Touch</h2>
            <p>
              Have a project or need advice? Our team is ready to help <br />{' '}
              fill out the form or contact us directly
            </p>
          </div>

          <div className="row pt-5 gx-5">
            {/* Contact Form */}
            <div className="col-lg-7 mb-4 py-5 card shadow border-0">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <label htmlFor="fullname" className="form-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    {
                      ...register('fullname', { required: 'Full Name is required' })
                    }
                    className={`form-control ${errors.fullname ? 'is-invalid' : ''}`}
                    id="fullname"
                    autoComplete="fullname"
                  />
                  {errors.fullname && (
                    <p className="text-danger pt-2 invalid-feedback">{errors.fullname.message}</p>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>
                  <input
                    {
                      ...register('address')
                    }
                    type="text"
                    className="form-control"
                    id="address"
                    autoComplete="street-address"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <input type="email"
                   {...register('email', {
                        required: 'This field is required',
                        pattern: {
                          value:
                            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,  
                          message: 'Please enter a valid email address',
                        },
                      })}
                  className={`form-control ${errors.email ? 'is-invalid' : ''}` } id="email" />
                  {errors.email && (
                      <p className="text-danger pt-2 invalid-feedback">{errors.email.message}</p>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="subject" className="form-label">
                    Subject
                  </label>
                  <input type="text" 
                  {
                      ...register('subject')
                  }
                  className="form-control" id="subject" />
                </div>

                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Phone Number
                  </label>
                  <input type="tel" 
                   {
                      ...register('phone')
                   }
                  className="form-control" id="phone" />
                </div>

                <div className="mb-3">
                  <label htmlFor="message" className="form-label">
                    Message
                  </label>
                  <textarea
                  {
                      ...register('message')
                  }
                    className="form-control"
                    id="message"
                    rows="5"
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary small-btn">
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="col-lg-5">
              <div className="contact-info py-5 px-4 bg-white card shadow border-0 ">
                <h5 className="mb-4">Contact Details</h5>
                <p>
                  <i className="bi bi-geo-alt-fill me-2 text-primary"></i>123
                  Construction Street, Kathmandu, Nepal
                </p>
                <p>
                  <i className="bi bi-telephone-fill me-2 text-primary"></i>+977
                  9812345678
                </p>
                <p>
                  <i className="bi bi-envelope-fill me-2 text-primary"></i>
                  info@constructionco.com
                </p>
                <p>
                  <i className="bi bi-clock-fill me-2 text-primary"></i>Mon -
                  Sat: 9:00 AM - 6:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default ContactUs;
