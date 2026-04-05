import { apiUrl } from './http';
import React from 'react';
import ArticleCard from './ArticleCard'; // Reusable card component for each article
import SkeletonLoader from '../common/SkeletonLoader';

// SHOW LATEST ARTICLES AND BLOGS ON HOME PAGE.
const LatestArticles = () => {
  const [articles, setArticles] = React.useState([]);
  const [loading, setLoading] = React.useState(true);  // To show loading skeleton while fetching data from api.

  // Api call to fetch latest 3 articles.
  const fetchLatestArticles = async () => {
     try {
       const res = await fetch(`${apiUrl}/get-latest-articles?limit=3`);
       const result = await res.json();
       setArticles(result.data);
     } catch (error) {
       console.log(error);
     } finally {
       setLoading(false); // always stop loading
     }
   };

  React.useEffect(() => {
    fetchLatestArticles();
  }, []);

  return (
    <>
      <section className="section-6 bg-light pt-5 pb-md-4">
        <div className="container pt-lg-5 pt-3 pb-4">
          <div className="section-header text-center">
            <span>Article and Blogs</span>
            <h2>Explore Our Latest Stories</h2>
            <p>
              Discover the latest updates, stories, and insights to keep you
              informed and inspired.
            </p>
          </div>

          {/* Loading */}
          {loading && (
            <div className="container">
              <SkeletonLoader bars={3} width="8px" />
            </div>
          )}
          {!loading && articles.length > 0 && ( // only show articles when not loading and articles exist
          <div className="row pt-5">
            {articles.map((article) => (
              // The "article" prop here is sent to ArticleCard.jsx.
              <ArticleCard key={article?.id} article={article} />
            ))}
          </div>
          )}

          {/* Empty State */} 
          {!loading && articles.length === 0 && (
            <p className="text-center pt-5">No articles found</p>
          )}
        </div>
      </section>
    </>
  );
};

export default LatestArticles;
