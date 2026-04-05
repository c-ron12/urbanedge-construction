import React from 'react';
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import Sidebar from '../../common/Sidebar';
import { apiUrl, token } from '../../common/http'; // apiUrl is defined in src/components/common/http.js
import { Link } from 'react-router-dom'; // using link instead of anchor tag to avoid page reload
import { toast } from 'react-toastify';


// SHOW ALL ARTICLES IN TABLE
const Show = () => {
  const [articles, setArticles] = React.useState([]); // state to store articles list, used in table below and in delete function
  const [loading, setLoading] = React.useState(true); // true means data is being fetched

  const fetchArticles = async () => {
    setLoading(true); // start loading
    const res = await fetch(`${apiUrl}/articles`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token()}`,
      },
    });

    const result = await res.json();
    setArticles(result.data || []); // <-- use result.data (array).. data is coming from backend API response articleController@index
    setLoading(false); // stop loading
  };

  const deleteArticle = async (id) => {
    // function to delete article by id

    if (confirm('Are you sure you want to delete this article?')) {
      const res = await fetch(`${apiUrl}/articles/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token()}`,
        },
      });
      const result = await res.json();

      if (result.status === true) {
        //  It filters the current 'articles' array stored in component state).
        // It keeps every article whose 'id' does NOT match the 'id' of the article that was just deleted.
        const filteredArticles = articles.filter(
          (article) => article.id !== id
        ); // remove deleted article from state

        setArticles(filteredArticles);
        toast.success(result.message);
      } else {
        toast.error(result.message);
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
        <div className="container my-5">
          <div className="row">
            <div className="col-md-3">
              <Sidebar />
            </div>
            <div className="col-md-9">
              <div className="card shadow border-0">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <h5>Articles</h5>
                    <Link
                      to="/admin/articles/create"
                      className="btn btn-primary"
                    >
                      Create
                    </Link>
                  </div>
                  <hr />
                  {loading ? (
                    <div className="spinner"></div>
                  ) : (
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Title</th>
                          {/* <th>Slug</th> */}
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {articles &&
                          articles.map((article) => (
                            <tr key={article.id}>
                              <td>{article.id}</td>
                              <td>{article.title}</td>
                              {/* <td>{article.slug}</td> */}

                              <td>
                                {article.status == 1 ? 'Active' : 'Inactive'}
                              </td>

                              <td>
                                <Link
                                  to={`/admin/articles/edit/${article.id}`}
                                  className="btn btn-sm btn-info me-2"
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
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
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
