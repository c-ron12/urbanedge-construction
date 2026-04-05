import { apiUrl } from './http';
import React from 'react';
import ArticleCard from './ArticleCard'; // Reusable card component for each article

// SHOW LATEST ARTICLES AND BLOGS ON HOME PAGE.
const LatestArticles = () => {
  const [articles, setArticles] = React.useState([]);

  // Api call to fetch latest 3 articles.
  const fetchLatestArticles = async () => {
    const res = await fetch(`${apiUrl}/get-latest-articles?limit=3`, {
      method: 'GET',
    });
    const result = await res.json();
    // console.log(result);
    setArticles(result.data); // data is coming from backend api response index function of frontend/ArticleController.
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

          
        </div>
      </section>
    </>
  );
};

export default LatestArticles;
