import { apiUrl } from './http';
import React from 'react';
import { fileUrl } from './http';

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

          <div className="row pt-5 justify-content-center">
            {articles &&
              articles.map((article) => {
                return (
                  <div key={article.id} className="col-lg-4 col-md-6 mb-5 gx-5">
                    <div className="card shadow border-0 h-100">
                      <div className="card-img-top">
                        <img
                          src={`${fileUrl}/uploads/articles/small/${article.image}`}
                          className="w-100"
                          alt="Articles & Blogs Image"
                        />
                      </div>
                      <div className="card-body py-4">
                        <div className="pb-1">
                          <a href="" className="blog-title">
                            {article.title}
                          </a>
                        </div>

                        <a
                          href="#"
                          className="btn btn-primary blog-readmore-btn mt-3 small-btn"
                        >
                          Read More
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    </>
  );
};

export default LatestArticles;
