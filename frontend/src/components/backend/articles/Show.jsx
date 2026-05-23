import React from 'react';
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import Sidebar from '../../common/Sidebar';

import { Link } from 'react-router-dom'; // using link instead of anchor tag to avoid page reload
import { toast } from 'react-toastify';
import { Spinner } from 'react-bootstrap';
import { confirmToast } from '../../common/confirmToast';

import { request } from '../../common/httpClient';
import { getErrorMessage } from '../../common/apiErrorHandler';

// SHOW ALL ARTICLES IN TABLE
const Show = () => {
  const [articles, setArticles] = React.useState([]); // state to store articles list, used in table below and in delete function
  const [loading, setLoading] = React.useState(true); // To show loading skeleton while fetching data from api. true means data is being fetched, false means data has been fetched and we can show the articles or empty state.
  const [error, setError] = React.useState(null); // To store error message if api call fails, used in empty state below.

  const fetchArticles = async () => {
    setLoading(true); // start loading
    setError(null); // clear previous errors (if any) before new fetch attempt, (important when retrying API). Without this, old error messages could still show

    // API call to fetch articles
    try {
      const result = await request('articles');

      if (result.status === false) {
        setError(result.message || 'Failed to load articles');
        setArticles([]); // safe fallback in case of error to avoid infinite loading skeleton bug.
        setLoading(false); // stop loading, hide loading spinner and show empty state or error message.
        return;
      }

      setArticles(result.data || []); // <-- use result.data (array).. data is coming from backend API response admin/ArticleController@index.
    } catch (error) {
      setError(getErrorMessage(error, 'Failed to load articles'));
      setArticles([]); // safe fallback in case of error to avoid infinite loading skeleton bug.
    } finally {
      setLoading(false); // stop loading, hide loading spinner and show articles or empty state or error message.
    }
  };

  const executeDelete = async (id) => {
    try {
      const result = await request(`articles/${id}`, {
        method: 'DELETE',
      });

      if (result.status === true) {
        const filteredArticles = articles.filter(
          (article) => article.id !== id
        );
        setArticles(filteredArticles);
        toast.success(result.message || 'Article moved to Trash successfully.');
      } else {
        toast.error(result.message || 'Delete failed');
      }
    } catch (error) {
      toast.error(getErrorMessage(error, 'Failed to delete article'));
    }
  };

  // Custom Toast Confirmation
  const confirmDelete = (article) => {
    confirmToast({
      message: (
        <>
          Are you sure you want to delete this <strong>{article.title}</strong>?
        </>
      ),

      description:
        'This article can be restored from the Trash within 30 days.',

      onConfirm: () => executeDelete(article.id),
    });
  };

  React.useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <>
      <Header />

      <main>
        <div className="container my-5 pt-5 pb-2 pb-sm-4">
          <div className="row mt-5">
            <div className="col-md-3">
              <Sidebar />
            </div>
            <div className="col-md-9 mt-4 mt-md-0">
              <div className="card shadow border-0">
                <div className="card-body">
                  <div className="d-flex border-bottom pb-3">
                    <h5>Articles</h5>
                    <div className="d-flex ms-auto column-gap-3 row-gap-1 action-btns">
                      <Link
                        to="/admin/articles/create"
                        className="btn btn-primary btn-md"
                      >
                        Create
                      </Link>

                      <Link
                        to="/admin/articles/trash"
                        className="btn btn-primary btn-md"
                      >
                        Trash
                      </Link>
                    </div>
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
                                    title={article.title}
                                  >
                                    {article.title}
                                  </div>
                                </td>

                                <td>
                                  {article.status == 1 ? 'Active' : 'Inactive'}
                                </td>

                                <td>
                                  <div className="d-flex flex-wrap custom-gap">
                                    <Link
                                      to={`/admin/articles/edit/${article.id}`}
                                      className="btn btn-sm btn-info"
                                    >
                                      Edit
                                    </Link>
                                    <button
                                      onClick={() => confirmDelete(article)}
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
