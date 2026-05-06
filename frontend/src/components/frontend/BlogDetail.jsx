import React from 'react';
import Banner from '../common/Banner';
import BannerImg from '../../assets/images/construction9.jpg';
import Header from '../common/Header';
import Footer from '../common/Footer';
import { apiUrl, fileUrl } from '../common/http';
import { useParams, NavLink, useLocation } from 'react-router-dom';
import SkeletonLoader from '../common/SkeletonLoader';
import EmptyState from '../common/EmptyState'; // Reusable component to show empty state when no service is found.
import useFetch from '../../hooks/useFetch'; // Reusable hook to fetch data from API

const BlogDetail = () => {
  const params = useParams();
  const location = useLocation(); // Determine navigation source via location.state.from  (external: Home Page/Latest Articel & Blog section, Blog page or global footer except ArticleDetail page; internal sidebar/footer of ArticleDetail page)

  const [articles, setArticles] = React.useState([]);
  const sectionRef = React.useRef(null); // Reference to section element; used to scroll into view when navigation from external page or internal page.

  // Api call to fetch all articles for sidebar.
  const fetchArticles = async () => {
    try {
      const res = await fetch(`${apiUrl}/get-articles/`);

      if (!res.ok) {
        throw new Error('SERVER_ERROR');
      }

      // Converts JSON (string) response body into JavaScript object.
      // Throws if response is not valid JSON (caught in catch, but not as 'INVALID_RESPONSE' unless rethrown)
      const result = await res.json();

      if (!result || !Array.isArray(result.data)) {
        throw new Error('INVALID_RESPONSE');
      }

      setArticles(result.data);
    } catch (error) {
      console.error('Fetch articles error:', error);
      setArticles([]); // safe fallback in case of error to avoid infinite loading skeleton bug in sidebar and to show empty state in sidebar instead of loading skeleton.
    }
  };

  // use hook to manage all state and fetch blog details.
  const {
    data: article,
    loading,
    error,
  } = useFetch(`${apiUrl}/get-article/${params.id}`, false); // use false to fetch single article instead of array(list) of articles.

  React.useEffect(() => {
    if (location.state?.from === 'external') {
      window.scrollTo(0, 0); // If user came from external page like Home page or Blog page then scroll to top, because they might be in middle or end of the page when they click on a particlar article. But if they are clicking on article from sidebar of ArticleDetail page, we don't scroll to top because they are already on the B detail page.
    } else if (location.state?.from === 'footer') {
      sectionRef.current.scrollIntoView(); // Scroll the page until this section is visible, <section className="section-10 pt-5 pb-4" ref={sectionRef}>
    } else if (location.state?.from === 'sidebar') {
      sectionRef.current?.scrollIntoView();
    }

    fetchArticles();
  }, [params.id]); // Added params.id as a dependency to refetch when the id changes, means when user clicks on another article from sidebar, it will fetch that article details.

  return (
    <>
      <Header />

      <main style={{ marginTop: '80px' }}>
        <Banner
          heading={
            'Projects That Define Us and Reflect <br /> Our Commitment to Excellence'
          }
          title={article?.title || ''}
          // text={''}
          bgImage={BannerImg}
        />

        <section className="section-10 pt-5 pb-4" ref={sectionRef}>
          <div className="container pt-lg-4 pt-2 pb-4">
            <div className="row gx-md-5 gx-0">
              {/* Main Content */}
              <div className="col-md-8">
                <div className="position-relative">
                  {/* only show loading skeleton while fetching data from api */}
                  {loading && (
                    <div
                      className="d-flex justify-content-center align-items-center"
                      style={{ minHeight: '400px' }}
                    >
                      <SkeletonLoader bars={3} width="8px" />
                    </div>
                  )}

                  {/* Loader Centered, only show content when not loading and article exists */}
                  {!loading && article && (
                    <>
                      <h3>{article.title}</h3>

                      <div className="pb-3">
                        by <strong>{article.author}</strong> on{' '}
                        {article.created_at}
                      </div>

                      {article.image && (
                        <div className="img-container">
                          <img
                            src={`${fileUrl}/uploads/articles/large/${article.image}`}
                            alt={article.title}
                            className="mb-4 shadow border-0 w-100"
                          />
                        </div>
                      )}

                      <div
                        dangerouslySetInnerHTML={{ __html: article.content }}
                        className="py-4"
                      ></div>
                    </>
                  )}

                  {/*  No Data, only show empty state when not loading and no article exist */}
                  {!loading && !article && (
                    <EmptyState>
                      <h5>
                        {error ? 'Error loading article' : 'No data found'}
                      </h5>
                      <p className="text-muted mb-0">
                        {error || 'We couldn’t find this article.'}
                      </p>
                    </EmptyState>
                  )}
                </div>
              </div>

              {/* Sidebar */}
              <div className="col-md-4">
                <div className="card shadow border-0">
                  <div className="card-body p-4">
                    <h3 className="fw-bold mb-4 mt-2">Latest Blogs</h3>

                    {articles &&
                      articles.map((article) => {
                        return (
                          <div
                            className="article-item d-flex align-items-start"
                            key={article.id}
                          >
                            <div className="article-img">
                              <NavLink
                                to={`/blog/${article.id}`}
                                state={{ from: 'sidebar' }}
                              >
                                <img
                                  src={`${fileUrl}/uploads/articles/small/${article.image}`}
                                  alt={article.title}
                                />
                              </NavLink>
                            </div>

                            <div className="article-content">
                              <NavLink
                                to={`/blog/${article.id}`}
                                state={{ from: 'sidebar' }}
                              >
                                {article.title}
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
        </section>
      </main>

      <Footer />
    </>
  );
};

export default BlogDetail;
