import React from 'react';
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import Sidebar from '../../common/Sidebar';
import { useForm } from 'react-hook-form';

import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import JoditEditor from 'jodit-react'; // WYSIWYG editor.

import { request } from '../../common/httpClient';
import { getErrorMessage } from '../../common/apiErrorHandler';
import { useFormHelpers } from '../../../hooks/useFormHelpers';

// CREATE article FORM.
const Create = () => {
  // Router Hook, useNavigate to navigate programmatically after successful update.
  const navigate = useNavigate();

  // Custom Hooks, Reusable logic for image upload, wysiwyg editor and form handling
  const {
    isDisabled,
    setIsDisabled,
    imageId,
    imagePreview,
    handleFile,
    handleClearImage,
    editor,
    content,
    setContent,
  } = useFormHelpers(''); // pass empty string as initial content for the editor, because we are creating new article, if it was edit form, we would pass existing article content here to show in editor.

  const config = React.useMemo(
    () => ({
      readonly: false,
    }),
    []
  );

  // --- React Hook Form ---
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    //// data is a parameter and the value it receives is object of all form data.
    // console.log(data);.
    setIsDisabled(true); // ADDED THIS to disable submit button immediately when form is submitted, to prevent multiple submissions.

    const newData = { ...data, content: content, imageId: imageId };
    //  ...data means all data from form, content is wising editor data, imageId is uploaded image id that we are getting from handleFile function in below
    // newData is variable and the value it receives is object of all form data + content from wysiwyg editor.

    // --- API Call to Create article ---.
    try {
      const result = await request('articles', {
        method: 'POST',
        body: JSON.stringify(newData), // filled up form data is being sent as JSON string, backend will parse it and get the data in controller.
      });

      if (result.status === true) {
        toast.success(result.message); // message is coming from backend API response from ServiceController.php, store() method.
        navigate('/admin/articles');
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(getErrorMessage(error)); // default fallback error message
    } finally {
      setIsDisabled(false); // false here means, RE-ENABLE THE SUBMIT BUTTON after API call is finished, whether it succeeded or failed. This ensures the user can try again if there was an error.
    }
  };

  return (
    <>
      {/* bgClass is the prop coming from Header component, it adds light background to header in this page. */}
      <Header bgClass="bg-light" />

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
                    <h5>Create Articles</h5>
                    <Link to="/admin/articles" className="btn btn-primary">
                      Back
                    </Link>
                  </div>
                  <hr className="pb-2" />

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

                      {/* --- IMAGE PREVIEW SECTION WITH REMOVE BUTTON --- */}
                      {imagePreview && (
                        <div className="image-preview-wrapper">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="img-fluid preview-img"
                          />
                          <button
                            type="button"
                            onClick={() => handleClearImage('image')}
                            className="btn btn-danger btn-sm position-absolute btn-remove-image"
                            title="Remove image"
                          >
                            ✕
                          </button>
                        </div>
                      )}
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
                      className="btn btn-primary d-flex align-items-center justify-content-center ps-2"
                    >
                      Create
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

export default Create;
