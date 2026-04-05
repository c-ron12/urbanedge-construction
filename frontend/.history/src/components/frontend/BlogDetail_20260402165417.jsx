import React from 'react';
import Banner from '../common/Banner';
import BannerImg from '../../assets/images/construction9.jpg';
import Header from '../common/Header';
import Footer from '../common/Footer';
import { apiUrl, fileUrl } from '../common/http';
import { useParams, Link } from 'react-router-dom';

const BlogDetail = () => {
  const params = useParams();
  const [article, setArticle] = React.useState(null);
  const [latestArticles, setLatestArticles] = React.useState([]);

  const fetchLatestArticle = async () => {
    const res = await fetch(`${apiUrl}/get-latest-articles/`, {
      method: 'GET',
    });
    const result = await res.json();
    setLatestArticles(result.data);
  };

  const fetchArticle = async () => {
    const res = await fetch(`${apiUrl}/get-article/${params.id}`, {
      method: 'GET',
    });
    const result = await res.json();
    setArticle(result.data);
  };

  React.useEffect(() => {
    fetchArticle();
    fetchLatestArticle();
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

        <div className="container py-5">
          <div className="row">
            <div className="col-8">
              <h3>{article?.title}</h3>
              <div className="pb-3">
                by <strong>{article?.author}</strong> on {article?.created_at}
              </div>

              <div className="pe-md-5 img-container">
                <img
                  src={`${fileUrl}/uploads/articles/large/${article?.image}`}
                  alt={article?.title}
                  className="mb-4  shadow border-0"
                />
              </div>
              <div dangerouslySetInnerHTML={{ __html: article?.content }} className='py-5'></div>
            </div>

            <div className="col-md-4">
              <div className="card shadow border-0">
                <div className="card-body p-4">
                  <h3 className="fw-bold mb-4 mt-2">Latest Blogs</h3>
                  {latestArticles &&
                    latestArticles.map((article) => {
                      return (
                        <div className="latest-item d-flex align-items-start">
                          <div className="latest-img">
                            <Link to={`/blog/${article?.id}`}>
                              <img
                                src={`${fileUrl}/uploads/articles/small/${article?.image}`}
                                alt={article?.title}
                              />
                            </Link>
                          </div>

                          <div className="latest-content">
                            <Link to={`/blog/${article?.id}`}>
                              {article?.title}
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default BlogDetail;
