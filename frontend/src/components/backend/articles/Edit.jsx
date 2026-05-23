import React from 'react';
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import Sidebar from '../../common/Sidebar';
import { useForm } from 'react-hook-form';
import { fileUrl } from '../../common/http';
import { toast } from 'react-toastify';

import { Link, useNavigate, useParams } from 'react-router-dom'; // using useParams to get article id from url.
import { Spinner } from 'react-bootstrap';
import JoditEditor from 'jodit-react'; // WYSIWYG editor.

import { request } from '../../common/httpClient';
import { getErrorMessage } from '../../common/apiErrorHandler';
import { useFormHelpers } from '../../../hooks/useFormHelpers';

const Edit = ({ placeholder = 'content' }) => {
  // Router Hooks, useParams to get article id from URL, useNavigate to navigate programmatically after successful update.
  const params = useParams();
  const navigate = useNavigate();

  // Custom Hooks, Reusable logic for image upload, wysiwyg editor and form handling
  const {
    isDisabled,
    setIsDisabled,
    imageId,
    imagePreview,
    handleFile,
    editor,
    content,
    setContent,
  } = useFormHelpers('');

  // Local states
  const [loading, setLoading] = React.useState(true);
  const [articles, setArticles] = React.useState({});

  const config = React.useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || '', // ensure Jodit receives a string.
      autofocus: false,
    }),
    [placeholder]
  );

  // --- React Hook Form ---
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // --- Fetch article data on component mount ---
  React.useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true); // start loading, show loading spinner

      // --- API call to fetch article by id ---
      try {
        const result = await request(`articles/${params.id}`);

        if (result.status === false) {
          toast.error('Failed to fetch article');
          setLoading(false); // stop loading
          return;
        }

        setArticles(result.data); // Store fetched article data in state, data is coming from backend api admin/articleController@show.

        // set default filled values after fetching data
        reset({
          title: result.data.title,
          slug: result.data.slug,
          author: result.data.author,
          status: result.data.status,
        });
      } catch (error) {
        toast.error(getErrorMessage(error, 'Failed to fetch article'));
      } finally {
        setLoading(false); // stop loading, hide loading spinner
      }
    };

    fetchArticle();
  }, [params.id, reset]); //// params.id is article id from URL and reset is used to reset form default values

  // --- Form submit handler ---
  const onSubmit = async (data) => {
    // data is a parameter and the value it receives is object of all form data.
    setIsDisabled(true); // ADD THIS to disable submit button immediately when form is submitted, to prevent multiple submissions.

    const newData = { ...data, content: content, imageId: imageId };
    // newData is variable and the value it receives is object of all form data + content from wysiwyg editor.

    // --- API call to edit article ---
    try {
      const result = await request(`articles/${params.id}`, {
        method: 'PUT',
        body: JSON.stringify(newData),
      });

      if (result.status === true) {
        toast.success(result.message); // message is coming from backend API response from admin/ServiceController.php, update() method.

        navigate('/admin/articles');
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(getErrorMessage(error, 'Update failed'));
    } finally {
      setIsDisabled(false); // false here means, RE-ENABLE THE SUBMIT BUTTON after API call is finished, whether it succeeded or failed. This ensures the user can try again if there was an error.
    }
  };

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
                  <div className="d-flex justify-content-between">
                    <h5>Edit Articles</h5>
                    <Link to="/admin/articles" className="btn btn-primary">
                      Back
                    </Link>
                  </div>
                  <hr className="pb-2" />

                  {/* --- Show spinner while loading article data --- */}
                  {loading ? (
                    <div className="text-center my-5">
                      <Spinner animation="border" variant="primary" />
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="mb-3">
                        <label htmlFor="title" className="form-label">
                          Title
                        </label>
                        <input
                          id="title"
                          {...register('title', {
                            required: 'Title is required',
                            minLength: {
                              value: 3,
                              message: 'Title must be at least 3 characters',
                            },
                          })}
                          type="text"
                          className={`form-control ${errors.title && 'is-invalid'}`}
                        />
                        {errors.title && (
                          <p className="invalid-feedback">
                            {errors.title?.message}
                          </p>
                        )}
                      </div>

                      <div className="mb-3">
                        <label htmlFor="slug" className="form-label">
                          Slug
                        </label>
                        <input
                          id="slug"
                          {...register('slug', {
                            required: 'Slug is required',
                          })}
                          type="text"
                          className={`form-control ${errors.slug && 'is-invalid'}`}
                        />
                        {errors.slug && (
                          <p className="invalid-feedback">
                            {errors.slug?.message}
                          </p>
                        )}
                      </div>

                      <div className="mb-3">
                        <label htmlFor="author" className="form-label">
                          Author
                        </label>
                        <input
                          id="author"
                          type="text"
                          {...register('author')}
                          className="form-control"
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="description" className="form-label">
                          Description (Full Content)
                        </label>
                        <JoditEditor
                          id="description"
                          key={articles.id}
                          ref={editor}
                          value={content}
                          config={config}
                          tabIndex={1}
                          onBlur={(newContent) => setContent(newContent)}
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="image" className="form-label">
                          Image
                        </label>
                        <input
                          id="image"
                          type="file"
                          onChange={handleFile}
                          className="form-control"
                        />

                        {imagePreview ? (
                          <div className="mt-3">
                            <img
                              src={imagePreview}
                              alt="New Preview"
                              style={{
                                width: '200px',
                                borderRadius: '8px',
                                height: 'auto',
                              }}
                            />
                          </div>
                        ) : articles.image ? (
                          <div className="mt-3">
                            <img
                              src={`${fileUrl}/uploads/articles/small/${articles.image}`}
                              alt="Old"
                              style={{
                                width: '200px',
                                borderRadius: '8px',
                                height: 'auto',
                              }}
                            />
                          </div>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <label htmlFor="status" className="form-label">
                          Status
                        </label>
                        <select
                          id="status"
                          {...register('status')}
                          className="form-select"
                        >
                          <option value="1">Active</option>
                          <option value="0">Inactive</option>
                        </select>
                      </div>

                      <button
                        disabled={isDisabled}
                        className="btn btn-primary d-flex align-items-center justify-content-center"
                      >
                        Update
                        {isDisabled && (
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            className="ms-2"
                          />
                        )}
                      </button>
                    </form>
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

export default Edit;
