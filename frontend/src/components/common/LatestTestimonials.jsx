import React from 'react';
import { apiUrl, fileUrl } from '../common/http';
import SkeletonLoader from '../common/SkeletonLoader';
import EmptyState from '../common/EmptyState'; // Reusable component to show empty state when no services are found.
import useFetch from '../../hooks/useFetch'; // Reusable hook to fetch data from API

// Import Swiper React components.
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

// Import Swiper modules.
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css/pagination';

const LatestTestimonials = () => {
  // use hook to manage all state and fetch latest testimonials.
  const {
    data: testimonials,
    loading,
    error,
    refetch,
  } = useFetch(`${apiUrl}/get-latest-testimonials?limit=4`);

  return (
    <section className="section-5 pt-4 pt-sm-5 pb-md-4">
      <div className="container pt-lg-5 pb-3 pb-md-43">
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
                    <div className="card-body p-5 h">
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
          <EmptyState>
            <h5>
              {error ? 'Error loading testimonials' : 'No testimonials found'}
            </h5>
            <p className="text-muted mb-0">
              {error || 'We couldn’t find any testimonials at the moment.'}
            </p>

            {error === 'Unexpected data received.' ? (
              <Link
                to="/contact"
                className="text-primary fw-bold mt-2 d-inline-block text-decoration-underline"
              >
                Contact Support
              </Link>
            ) : (
              <span
                role="button"
                onClick={refetch}
                className="text-primary fw-bold mt-2 d-inline-block text-decoration-underline"
              >
                {error ? 'Retry' : 'Refresh'}
              </span>
            )}
          </EmptyState>
        )}
      </div>
    </section>
  );
};

export default LatestTestimonials;
