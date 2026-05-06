import React from 'react';
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import Sidebar from '../../common/Sidebar';
import { apiUrl, token } from '../../common/http'; // apiUrl is defined in src/components/common/http.js
import { Link } from 'react-router-dom'; // using link instead of anchor tag to avoid page reload
import { toast } from 'react-toastify';
import { Spinner } from 'react-bootstrap';

import { request } from '../../common/httpClient';
import { getErrorMessage } from '../../common/apiErrorHandler';

// SHOW ALL ARTICLES IN TABLE
const Show = () => {
  const [articles, setArticles] = React.useState([]); // state to store articles list, used in table below and in delete function
  const [loading, setLoading] = React.useState(true); // To show loading skeleton while fetching data from api. true means data is being fetched, false means data has been fetched and we can show the articles or empty state.
  const [error, setError] = React.useState(null); // To store error message if api call fails, used in empty state below.

  const fetchArticles = async () => {
    setLoading(true); // start loading

    // API call to fetch articles
    try {
      const result = await request(`${apiUrl}/articles`);

      if (result.status === false) {
        setError(result.message || 'Failed to load articles');
        setArticles([]); // safe fallback in case of error to avoid infinite loading skeleton bug.
        setLoading(false); // stop loading, hide loading spinner and show empty state or error message.
        return;
      }

      setArticles(result.data || []); // <-- use result.data (array).. data is coming from backend API response admin/ServiceController@index.
    } catch (error) {
      setError(getErrorMessage(error, 'Failed to load articles'));
      setArticles([]); // safe fallback in case of error to avoid infinite loading skeleton bug.
    } finally {
      setLoading(false); // stop loading, hide loading spinner and show articles or empty state or error message.
    }
  };

  const deleteArticle = async (id) => {
    // function to delete article by id

    if (confirm('Are you sure you want to delete this article?')) {
      try {
        const res = await fetch(`${apiUrl}/articles/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token()}`,
          },
        });

        // Handle HTTP errors
        if (!res.ok) {
          throw new Error('SERVER_ERROR');
        }

        const result = await res.json();

        // Safety check
        if (!result || typeof result.status === 'undefined') {
          throw new Error('INVALID_RESPONSE');
        }

        if (result.status === true) {
          //  It filters the current 'articles' array stored in component state).
          // It keeps every article whose 'id' does NOT match the 'id' of the article that was just deleted.
          const filteredArticles = articles.filter(
            (article) => article.id !== id
          ); // remove deleted article from state

          setArticles(filteredArticles);
          toast.success(result.message);
        } else {
          toast.error(result.message || 'Delete failed');
        }
      } catch (error) {
        console.error('Delete article error:', error);

        if (error.message === 'Failed to fetch') {
          toast.error('Network error. Please check your internet connection.');
        } else if (error.message === 'SERVER_ERROR') {
          toast.error('Server error. Please try again later.');
        } else {
          toast.error('Failed to delete article');
        }
      }
    }
  };

  React.useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <>
      <Header />

      <main>
        <div className="container my-sm-5 my-4 pt-5 pb-4">
          <div className="row mt-5">
            <div className="col-md-3 mb-4 mb-md-0">
              <Sidebar />
            </div>
            <div className="col-md-9">
              <div className="card shadow border-0">
                <div className="card-body">
                  <div className="d-flex justify-content-between border-bottom pb-4">
                    <h5>Articles</h5>
                    <Link
                      to="/admin/articles/create"
                      className="btn btn-primary"
                    >
                      Create
                    </Link>
                  </div>
                  {/* Loading State */}
                  {loading && (
                    <div className="text-center my-5 py-5">
                      <Spinner animation="border" variant="primary" />
                    </div>
                  )}

                  {/* Table */}
                  {!loading && (
                    <div className="table-responsive">
                      <table className="table align-middle">
                        <thead className="table-light border-bottom">
                          <tr>
                            <th className="py-3">ID</th>
                            <th className="py-3">Title</th>
                            <th className="py-3">Status</th>
                            <th className="py-3">Actions</th>
                          </tr>
                        </thead>

                        <tbody>
                          {error ? (
                            <tr>
                              <td
                                colSpan="5"
                                className="text-center align-middle py-5"
                              >
                                <div className="text-danger">{error}</div>

                                <span
                                  role="button"
                                  onClick={fetchArticles}
                                  className="text-primary fw-bold d-inline-block mt-2 text-decoration-underline"
                                >
                                  Retry
                                </span>
                              </td>
                            </tr>
                          ) : articles.length === 0 ? (
                            <tr>
                              <td
                                colSpan="5"
                                className="text-center align-middle py-5"
                              >
                                <div className="text-black">
                                  <p className="m-0">No articles found</p>
                                </div>

                                <span
                                  role="button"
                                  onClick={fetchArticles}
                                  className="text-primary fw-bold mt-2 d-inline-block text-decoration-underline"
                                >
                                  Refresh
                                </span>
                              </td>
                            </tr>
                          ) : (
                            articles.map((article) => (
                              <tr key={article.id}>
                                <td>{article.id}</td>
                                <td style={{ maxWidth: '250px' }}>
                                  <div
                                    className="text-truncate"
                                    title={article?.title}
                                  >
                                    {article?.title}
                                  </div>
                                </td>

                                <td>
                                  {article.status == 1 ? 'Active' : 'Inactive'}
                                </td>

                                <td>
                                  <div class="d-flex flex-wrap custom-gap">
                                    <Link
                                      to={`/admin/articles/edit/${article.id}`}
                                      className="btn btn-sm btn-info"
                                    >
                                      Edit
                                    </Link>
                                    <button
                                      onClick={() => deleteArticle(article.id)}
                                      type="button"
                                      className="btn btn-sm btn-danger"
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}
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

export default Show;
