import React from 'react';
import { apiUrl, fileUrl } from '../common/http';
import SkeletonLoader from '../common/SkeletonLoader';

// Import Swiper React components.
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

// Import Swiper modules.
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css/pagination';

const LatestTestimonials = () => {
  const [testimonials, setTestimonials] = React.useState([]);
  const [loading, setLoading] = React.useState(true); // To show loading skeleton while fetching data from api.

  // API call to fetch latest 5 testimonials
  const fetchLatestTestimonials = async () => {
    try {
      const res = await fetch(`${apiUrl}/get-latest-testimonials?limit=5`);
      const result = await res.json();
      setTestimonials(result.data); // data is coming from backend api response latestTestimonials function of TestimonialsController.
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // always stop loading
    }
  };

  React.useEffect(() => {
    fetchLatestTestimonials();
  }, []);

  return (
    <section className="section-5 pt-5 pb-md-4">
      <div className="container pt-lg-5 pt-3 pb-5">
        <div className="section-header text-center">
          <span>Testimonials</span>
          <h2>Trusted by our valued customers</h2>
          <p className="title-desc-text">
            Our customers experiences reflect the quality, care, and dedication
            we put into every project.
          </p>
        </div>

        {/* only show loading skeleton while fetching data from api */}
        {loading && (
          <div className="container text-center py-5">
            <SkeletonLoader bars={3} width="8px" />
          </div>
        )}

        {/* Show testimonials when not loading and testimonials exist */}
        {!loading && testimonials.length > 0 && (
          <div className="pt-4">
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={50}
              slidesPerView={3}
              pagination={{ clickable: true }}
              autoplay={{
                delay: 3000, // 3 seconds
                disableOnInteraction: false, // keep autoplay after interaction
              }}
              loop={testimonials.length > 3} // makes it continuous
              breakpoints={{
                0: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                992: { slidesPerView: 3 },
              }}
            >
              {testimonials.map((testimonial) => (
                <SwiperSlide key={testimonial.id}>
                  <div className="card shadow border-0">
                    <div className="card-body p-5">
                      <div className="rating">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="currentColor"
                            className="bi bi-star-fill"
                            viewBox="0 0 16 16"
                          >
                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                          </svg>
                        ))}
                      </div>

                      <div className="content pt-4 pb-2">
                        <p>{testimonial.testimonial}</p>
                      </div>

                      <hr />

                      <div className="d-flex meta">
                        {testimonial.image && (
                          <img
                            src={`${fileUrl}/uploads/testimonials/small/${testimonial.image}`}
                            alt={testimonial.citation}
                            className="rounded-circle"
                            width="60"
                            height="60"
                          />
                        )}
                        <div className="name ps-3 pt-2">
                          {testimonial.citation} <br />
                          <div>
                            <span className="lead">
                              {testimonial.designation}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        {/* only show when not loading and no testimonials exist */}
        {!loading && testimonials.length === 0 && (
          <p className="text-center pt-5">No testimonials found</p>
        )}
      </div>
    </section>
  );
};

export default LatestTestimonials;
