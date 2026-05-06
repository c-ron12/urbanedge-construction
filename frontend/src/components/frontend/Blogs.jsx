import React from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Banner from '../common/Banner';
import BlogBanner from '../../assets/images/construction9.jpg';
import { apiUrl } from '../common/http';
import ArticleCard from '../common/ArticleCard'; // Reusable card component for each service
import SkeletonLoader from '../common/SkeletonLoader';
import EmptyState from '../common/EmptyState'; // Reusable component to show empty state when no service is found.
import useFetch from '../../hooks/useFetch'; // Reusable hook to fetch data from API

// SHOW ALL ARTICLES ON BLOGS PAGE.
const Blogs = () => {
  // use hook to manage all state and fetch all articles.
  const {
    data: articles,
    loading,
    error,
    refetch,
  } = useFetch(`${apiUrl}/get-articles`);

  return (
    <>
      <Header />
      <main style={{ marginTop: '80px' }}>
        <Banner
          heading={
            'Projects That Define Us and Reflect <br /> Our Commitment to Excellence'
          }
          text={
            'Each project we complete stands as a proud testament to our craftsmanship, <br /> technical expertise, and long-term vision for excellence.'
          }
          bgImage={BlogBanner}
        />

        <section className="section-6 bg-light pt-4 pt-sm-5 pb-md-4">
          <div className="container pt-lg-5 pt-3 pb-3">
            <div className="section-header text-center">
              <span>Article and Blogs</span>
              <h2>Explore Our Stories</h2>
              <p className="title-desc-text">
                Stay connected with expert tips, success stories, and practical
                advice for your journey.
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
              <div className="row pt-5 justify-content-center gy-md-4">
                {articles.map((article) => (
                  // The "article" prop here is sent to ArticleCard.jsx.
                  <ArticleCard key={article?.id} article={article} />
                ))}
              </div>
            )}

            {/* Only show empty state when not loading and no articles exist */}
            {!loading && articles.length === 0 && (
              <EmptyState>
                <h5>
                  {error ? 'Error loading articles' : 'No articles found'}
                </h5>
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
      </main>

      <Footer />
    </>
  );
};

export default Blogs;
