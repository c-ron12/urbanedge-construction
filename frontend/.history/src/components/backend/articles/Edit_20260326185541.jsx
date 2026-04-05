import React from 'react';
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import Sidebar from '../../common/Sidebar';
import { useForm } from 'react-hook-form';
import { apiUrl, token, fileUrl } from '../../common/http'; // apiUrl and fileUrl is defined in src/components/common/http.js.
import { toast } from 'react-toastify';
import { Link, useNavigate, useParams } from 'react-router-dom'; // using useParams to get article id from url.
import JoditEditor from 'jodit-react'; // WYSIWYG editor.
import { Spinner } from 'react-bootstrap';

const Edit = ({ placeholder = 'content' }) => {
  // The placeholder prop is used to customize the text hint displayed in the Jodit Editor.
  const editor = React.useRef(null);
  const [content, setContent] = React.useState(''); // content for wising editor.
  const [isDisabled, setIsDisabled] = React.useState(false); // to disable submit button during image upload, false by default means button is enabled.
  const [imageId, setImageId] = React.useState(null); // to store uploaded image id.
  const params = useParams(); // to get article id from url.
  const [articles, setArticles] = React.useState(''); // to store fetched article data, used to show existing image below file input.
  const [imagePreview, setImagePreview] = React.useState(null); // to store uploaded image preview url.

  const [loading, setLoading] = React.useState(true); // true while fetching article data

  const config = React.useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || '', // ensure Jodit receives a string.
      autofocus: false,
    }),
    [placeholder]
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();

  // --- Fetch article data on component mount ---
  React.useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${apiUrl}/articles/${params.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token()}`,
          },
        });

        const result = await res.json();

        setContent(result.data.content); // to set content in wising editor from fetched data.
        setArticles(result.data); // to store fetched article data in state, data is coming from backend api articleController@show.

        reset({
          title: result.data.title,
          slug: result.data.slug,
          author: result.data.author,
          status: result.data.status,
        });
      } catch (error) {
        toast.error('Failed to fetch article');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [params.id, reset]);

  const onSubmit = async (data) => {
    // data is a parameter and the value it receives is object of all form data.
    setIsDisabled(true); // ADDED THIS to disable submit button immediately when form is submitted, to prevent multiple submissions.

    const newData = { ...data, content: content, imageId: imageId };
    // newData is variable and the value it receives is object of all form data + content from wysiwyg editor.

    try {
      const res = await fetch(`${apiUrl}/articles/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token()}`,
        },
        body: JSON.stringify(newData),
      });

      const result = await res.json();

      if (result.status === true) {
        toast.success(result.message); // message is coming from backend API response from articleController.php, update() method.
        navigate('/admin/articles');
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('Update failed');
    } finally {
      setIsDisabled(false);
    }
  };

  // Image upload handler.
  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImagePreview(URL.createObjectURL(file)); // Show image preview immediately after file selection.

    const formData = new FormData(); // FormData is built-in JS object to handle file uploads, like image, PDF etc, it helps to send file data as multipart/form-data.
    formData.append('image', file);
    setIsDisabled(true); // true means immediately disable the submit button during image upload, as soon as file is picked.

    try {
      const res = await fetch(`${apiUrl}/temp-images`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token()}`,
        },
        body: formData,
      });

      const result = await res.json();

      if (result.status === false) {
        toast.error(result.errors.image[0]);
        setImagePreview(null); // Clear preview if upload fails.
      } else {
        setImageId(result.data.id); // Store uploaded image id to use it during form submission, data and id are coming from backend API response from TempImageController.php, store() method.
      }
    } catch (error) {
      setImagePreview(null);
      toast.error('Image upload failed');
    } finally {
      // Clean up: This runs if the 'try' finishes OR if the 'catch' runs, It ensures the user can always try again.
      setIsDisabled(false);
    }
  };

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
