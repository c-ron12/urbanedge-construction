import React from 'react';
import { apiUrl } from './http';
import ServiceCard from './ServiceCard';
import SkeletonLoader from '../common/SkeletonLoader';
import EmptyState from '../common/EmptyState'; // Reusable component to show empty state when no services are found.
import useFetch from '../../hooks/useFetch'; // Reusable hook to fetch data from API
import { Link } from 'react-router';

// SHOW LATEST SERVICES ON HOME PAGE.
const LatestServices = () => {
  // use hook to manage all state and fetch latest services.
  const {
    data: services,
    loading,
    error,
    refetch,
  } = useFetch(`${apiUrl}/get-latest-services?limit=4`);

  return (
    <>
      <section className="section-3 bg-light pt-4 pt-sm-5 pb-md-4">
        <div className="container-fluid pt-lg-5 pb-3 pb-md-4">
          <div className="section-header text-center">
            <span>Our Services</span>
            <h2>Our Construction Services</h2>
            <p className="title-desc-text">
              We offer a diverse array of construction services, spanning
              residential, commercial, and industrial projects.
            </p>
          </div>
          {/* Loading, only show loading skeleton while fetching data from api */}
          {loading && (
            <div className="container">
              <SkeletonLoader bars={3} width="8px" />
            </div>
          )}

          {/* Only show services when not loading and services exist */}
          {!loading && services.length > 0 && (
            <div className="row pt-5">
              {services.map((service) => (
                // The "service" prop here is sent to ServiceCard.jsx.
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          )}

          {/* Empty State, only show empty state when not loading and no services exist */}
          {!loading && services.length === 0 && (
            <EmptyState>
              <h5>{error ? 'Error loading services' : 'No services found'}</h5>
              <p className="text-muted mb-0">
                {error || 'We couldn’t find any services at the moment.'}
              </p>

              {error === 'Unexpected data received.' ? (
                <Link
                  to="/contact"
                  className= "text-primary fw-bold mt-2 d-inline-block text-decoration-underline"
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
    </>
  );
};

export default LatestServices;
