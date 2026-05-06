import { apiUrl } from './http';
import React from 'react';
import ArticleCard from './ArticleCard'; // Reusable card component for each article
import SkeletonLoader from '../common/SkeletonLoader';
import EmptyState from '../common/EmptyState'; // Reusable component to show empty state when no services are found.
import useFetch from '../../hooks/useFetch'; // Reusable hook to fetch data from API

// SHOW LATEST ARTICLES AND BLOGS ON HOME PAGE.
const LatestArticles = () => {
  // use hook to manage all state and fetch latest articles.
  const {
    data: articles,
    loading,
    error,
    refetch,
  } = useFetch(`${apiUrl}/get-latest-articles?limit=3`);

  return (
    <>
      <section className="section-6 bg-light pt-4 pt-sm-5 pb-md-4">
        <div className="container pt-lg-5 pb-3 pb-md-4">
          <div className="section-header text-center">
            <span>Article and Blogs</span>
            <h2>Explore Our Latest Stories</h2>
            <p className="title-desc-text">
              Discover the latest updates, stories, and insights to keep you
              informed and inspired.
            </p>
          </div>

          {/* only show loading skeleton while fetching data from api */}
          {loading && (
            <div className="container">
              <SkeletonLoader bars={3} width="8px" />
            </div>
          )}

          {/* Only show articles when not loading and articles exist */}
          {!loading && articles.length > 0 && (
            <div className="row pt-5 justify-content-center">
              {articles.map((article) => (
                // The "article" prop here is sent to ArticleCard.jsx.
                <ArticleCard key={article?.id} article={article} />
              ))}
            </div>
          )}

          {/* only show empty state when not loading and no articles exist */}
          {!loading && articles.length === 0 && (
            <EmptyState>
              <h5>{error ? 'Error loading articles' : 'No articles found'}</h5>
              <p className="text-muted mb-0">
                {error || 'We couldn’t find any articles at the moment.'}
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
    </>
  );
};

export default LatestArticles;
