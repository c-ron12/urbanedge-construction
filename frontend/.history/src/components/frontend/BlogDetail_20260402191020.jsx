import React from 'react';
import Banner from '../common/Banner';
import BannerImg from '../../assets/images/construction9.jpg';
import Header from '../common/Header';
import Footer from '../common/Footer';
import { apiUrl, fileUrl } from '../common/http';
import { useParams, NavLink, useLocation } from 'react-router-dom';
import SkeletonLoader from '../common/SkeletonLoader';

const BlogDetail = () => {
  const params = useParams();
  const location = useLocation(); // To check if user came from external page or from sidebar within blog detail page.

  const [article, setArticle] = React.useState(null);
  const [allArticles, setAllArticles] = React.useState([]);

  const [loading, setLoading] = React.useState(true); // To show loading skeleton while fetching data from api.
  const sectionRef = React.useRef(null); // To scroll to top when user clicks on Read More Button of ServiceCard.

  const fetchAllArticles = async () => {
    const res = await fetch(`${apiUrl}/get-articles/`, {
      method: 'GET',
    });
    const result = await res.json();
    setAllArticles(result.data);
  };

  // Api call to fetch single article
  const fetchArticle = async () => {
    setLoading(true); // start loading
    try {
      const res = await fetch(`${apiUrl}/get-article/${params.id}`);
      const result = await res.json();
      setArticle(result.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // stop loading
    }
  };

  React.useEffect(() => {
    fetchArticle();
    fetchAllArticles();
  }, [params.id]);

  return (
    <>
      <Header />
      <main>
        <Banner
          heading={
            'Projects That Define Us and Reflect <br /> Our Commitment to Excellence'
          }
          title={article?.title || ''}
          // text={''}
          bgImage={BannerImg}
        />
        <section className="section-10 pt-5 pb-md-4 pb-3">
          <div className="position-realative">
            {/* {/* only show loading skeleton while fetching data from api */}
            {loading && (
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: '400px' }}
              >
                <SkeletonLoader bars={3} width="8px" />
              </div>
            )}

            {/* Loader Centered, only show content when not loading and service exists */}
            {!loading && article && (
              <>
                {article.image && (
                  <img
                    src={`${fileUrl}/uploads/articles/large/${article.image}`}
                    alt={article.title}
                    className="mb-4 w-100 shadow border-0"
                  />
                )}

                <h3 className="my-3">{article.title}</h3>

                <div
                  className="content-description"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
              </>
            )}

            {/*  No Data, only show empty state when not loading and no servies exist */}
            {!loading && !article && (
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: '400px' }}
              >
                No Data Found
              </div>
            )}
            
            <div className="container pt-lg-5 pt-4 pb-4">
              <div className="row gx-5">
                <div className="col-8">
                  <h3>{article?.title}</h3>
                  <div className="pb-3">
                    by <strong>{article?.author}</strong> on{' '}
                    {article?.created_at}
                  </div>

                  <div className="img-container">
                    <img
                      src={`${fileUrl}/uploads/articles/large/${article?.image}`}
                      alt={article?.title}
                      className="mb-4  shadow border-0"
                    />
                  </div>
                  <div
                    dangerouslySetInnerHTML={{ __html: article?.content }}
                    className="py-4"
                  ></div>
                </div>

                <div className="col-md-4">
                  <div className="card shadow border-0">
                    <div className="card-body p-4">
                      <h3 className="fw-bold mb-4 mt-2">Latest Blogs</h3>
                      {allArticles &&
                        allArticles.map((article) => {
                          return (
                            <div className="latest-item d-flex align-items-start">
                              <div className="latest-img">
                                <NavLink
                                  to={`/blog/${article?.id}`}
                                  state={{ from: 'sidebar' }}
                                >
                                  <img
                                    src={`${fileUrl}/uploads/articles/small/${article?.image}`}
                                    alt={article?.title}
                                  />
                                </NavLink>
                              </div>

                              <div className="latest-content">
                                <NavLink
                                  to={`/blog/${article?.id}`}
                                  state={{ from: 'sidebar' }}
                                >
                                  {article?.title}
                                </NavLink>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default BlogDetail;
