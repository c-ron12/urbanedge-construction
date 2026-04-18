import React from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Banner from '../common/Banner';
import BlogBanner from '../../assets/images/construction9.jpg';
import { apiUrl } from '../common/http';
import ArticleCard from '../common/ArticleCard'; // Reusable card component for each service
import SkeletonLoader from '../common/SkeletonLoader';

// SHOW ALL ARTICLES ON BLOGS PAGE.
const Blogs = () => {
  const [articles, setArticles] = React.useState([]);
  const [loading, setLoading] = React.useState(true); // To show loading skeleton while fetching data from api.

  // Api call to fetch all articles
  const fetchAllArticles = async () => {
    try {
      const res = await fetch(`${apiUrl}/get-articles`);
      const result = await res.json();
      setArticles(result.data); // data is coming from backend API response from ArticleController, index()
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // always stop loading
    }
  };

  React.useEffect(() => {
    fetchAllArticles();
  }, []);

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

        <section className="section-6 bg-light pt-5 pb-md-4">
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
              <div className="text-center py-5">
                <div className="empty-state">
                  <h5 className="mb-2">No Articles Found</h5>
                  <p className="text-muted mb-0">
                    We couldn’t find any artilces at the moment.
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Blogs;
