import React from 'react';

const ContactUs = () => {
  return (
    <section className="contact-us-section py-5 bg-light">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-5">
          <span className="text-primary fw-bold">Contact Us</span>
          <h2 className="mt-2">Get in Touch with Our Experts</h2>
          <p className="text-muted">
            Whether you have a project in mind or need a consultation, our team
            is ready to assist you. Fill out the form or reach us via the
            provided contact details.
          </p>
        </div>

        <div className="row">
          {/* Contact Form */}
          <div className="col-lg-7 mb-4">
            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter your name"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="form-control"
                  id="phone"
                  placeholder="Enter your phone number"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label">
                  Message
                </label>
                <textarea
                  className="form-control"
                  id="message"
                  rows="5"
                  placeholder="Write your message"
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="col-lg-5">
            <div className="contact-info p-4 bg-white shadow-sm rounded">
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
                <i className="bi bi-clock-fill me-2 text-primary"></i>Mon - Sat:
                9:00 AM - 6:00 PM
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
