import React from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Banner from '../common/Banner';
import ServiceCard from '../common/ServiceCard'; // Reusable card component for each service
import BannerImg from '../../assets/images/banner2.jpg';
import { apiUrl } from '../common/http';
import SkeletonLoader from '../common/SkeletonLoader';
import EmptyState from '../common/EmptyState'; // Reusable component to show empty state when no services are found.
import useFetch from '../../hooks/useFetch'; // Reusable hook to fetch data from API

// SHOW ALL SERVICES ON SERVICES PAGE
const Services = () => {
  // use hook to manage all state and fetch all services.
  const {
    data: services,
    loading,
    error,
    refetch,
  } = useFetch(`${apiUrl}/get-services`);

  return (
    <>
      <Header />
      <main style={{ marginTop: '80px' }}>
        <Banner
          heading={'Shaping Tomorrows <br /> Structures Today'}
          text={
            'Our expert team blends innovation and craftsmanship to construct projects that stand the test of time, <br /> inspire progress, and reflect our unwavering commitment to quality and excellence.'
          }
          bgImage={BannerImg}
        />

        {/* Services list section */}
        <section className="section-3 bg-light pt-4 pt-sm-5 pb-md-4">
          <div className="container-fluid pt-lg-5 pt-3 pb-3">
            <div className="section-header text-center">
              <span>Our Services</span>
              <h2>All Construction Services</h2>
              <p className="title-desc-text">
                Explore our complete range of construction services, including
                residential, commercial, and industrial projects.
              </p>
            </div>

            {/* only show loading skeleton while fetching data from api */}
            {loading && (
              <div className="container">
                <SkeletonLoader bars={3} width="8px" />
              </div>
            )}

            {/* Only show services when not loading and services exist */}
            {!loading && services.length > 0 && (
              <div className="row pt-5 justify-content-center gy-md-4">
                {/* Render a ServiceCard for each service */}
                {services.map((service) => (
                  // "service" is a single service object passed as a prop to ServiceCard
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            )}

            {/* only show empty state when not loading and no services exist */}
            {!loading && services.length === 0 && (
              <EmptyState>
                <h5>
                  {error ? 'Error loading services' : 'No services found'}
                </h5>
                <p className="text-muted mb-0">
                  {error || 'We couldn’t find any services at the moment.'}
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
      </main>

      <Footer />
    </>
  );
};

export default Services;
