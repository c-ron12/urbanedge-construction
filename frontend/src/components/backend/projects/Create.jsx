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

// CREATE PROJECT FORM.
const Create = ({ placeholder = 'content' }) => {
  // Router Hook, useNavigate to navigate programmatically after successful update.
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

  const config = React.useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || 'Content',
    }),
    [placeholder]
  );

  // --- React Hook Form ---
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Form submission handler.
  const onSubmit = async (data) => {
    //// data is a parameter and the value it receives is object of all form data.
    // console.log(data);.

    setIsDisabled(true); // ADD THIS to disable submit button immediately when form is submitted, to prevent multiple submissions.
    const newData = { ...data, content: content, imageId: imageId };
    //  ...data means all data from form, content is wising editor data, imageId is uploaded image id that we are getting from handleFile function in below
    // newData is variable and the value it receives is object of all form data + content from wysiwyg editor.

    try {
      const result = await request('projects', {
        method: 'POST',
        body: JSON.stringify(newData), // filled up form data is being sent as JSON string, backend will parse it and get the data in controller.
      });

      if (result.status === true) {
        toast.success(result.message); // message is coming from backend API response from ProjectController.php, store() method.
        navigate('/admin/projects');
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
                    <h5>Create Projects</h5>
                    <Link to="/admin/projects" className="btn btn-primary">
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

                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label htmlFor="location" className="form-label">
                          Location
                        </label>
                        <input
                          id="location"
                          {...register('location')}
                          type="text"
                          className="form-control"
                        />
                      </div>

                      <div className="col-md-6">
                        <label
                          htmlFor="construction_type"
                          className="form-label"
                        >
                          Construction Type
                        </label>
                        <select
                          id="construction_type"
                          {...register('construction_type')}
                          className="form-select"
                        >
                          <option value="residential construction">
                            Residential Construction
                          </option>
                          <option value="commercial construction">
                            Commercial Construction
                          </option>
                          <option value="industrial construction">
                            Industrial Construction
                          </option>
                          <option value="infrastructure construction">
                            Infrastructure Construction
                          </option>
                          <option value="Healthcare Facility Construction">
                            Healthcare Facility Construction
                          </option>
                          <option value="Educational Campus Construction">
                            Educational Campus Construction
                          </option>
                          <option value="Hotel & Resort Construction">
                            Hotel & Resort Construction
                          </option>
                          <option value="Sports & Recreation Construction">
                            Sports & Recreation Construction
                          </option>
                        </select>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label htmlFor="sector" className="form-label">
                          Sector
                        </label>
                        <select
                          id="sector"
                          {...register('sector')}
                          className="form-select"
                        >
                          <option value="Residental">Residental</option>
                          <option value="Industrial">Industrial</option>
                          <option value="Corporate">Corporate</option>
                          <option value="Health">Health</option>
                          <option value="Education">Education</option>
                          <option value="Hospitality">Hospitality</option>
                          <option value="Mixed-Use">Mixed-Use</option>
                        </select>
                      </div>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="short_desc" className="form-label">
                        Short Description (Summary for Cards)
                      </label>
                      <textarea
                        id="short_desc"
                        {...register('short_desc')}
                        className="form-control"
                        rows="3"
                      ></textarea>
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
                      <br />
                      <input
                        id="image"
                        type="file"
                        onChange={handleFile}
                        className="form-control"
                      />
                    </div>

                    {/* --- IMAGE PREVIEW SECTION --- */}
                    {imagePreview && (
                      <div className="mt-3">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          style={{
                            width: '200px',
                            height: 'auto',
                            borderRadius: '8px',
                          }}
                        />
                      </div>
                    )}

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
