import React from 'react';
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import Sidebar from '../../common/Sidebar';
import { useForm } from 'react-hook-form';

import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

import { request } from '../../common/httpClient';
import { getErrorMessage } from '../../common/apiErrorHandler';
import { useFormHelpers } from '../../../hooks/useFormHelpers';

// CREATE MEMBER FORM.
const Create = () => {
  // Router Hook, useNavigate to navigate programmatically after successful update.
  const navigate = useNavigate();

  // Custom Hooks, Reusable logic for image upload and form handling
  const {
    isDisabled,
    setIsDisabled,
    imageId,
    imagePreview,
    handleFile,
    handleClearImage,
  } = useFormHelpers();

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

  // Form submit handler
  const onSubmit = async (data) => {
    // data is a parameter and the value it receives is object of all form data.
    // console.log(data);.

    setIsDisabled(true); // ADDED THIS to disable submit button immediately when form is submitted, to prevent multiple submissions.

    const newData = { ...data, imageId: imageId };
    //  ...data means all data from form, imageId is uploaded image id that we are getting from handleFile function in below
    // newData is variable and the value it receives is object of all form data.

    // --- API Call to Create member ---.
    try {
      const result = await request('members', {
        method: 'POST',
        body: JSON.stringify(newData), // filled up form data is being sent as JSON string, backend will parse it and get the data in controller.
      });

      if (result.status === true) {
        toast.success(result.message); // message is coming from backend API response from ServiceController.php, store() method.
        navigate('/admin/members');
      } else {
        // If the backend returned status: false (like 422 response)
        if (result.errors) {
          // map these errors to the form or show a specific toast
          const firstError = Object.values(result.errors)[0][0];
          toast.error(firstError);
        } else {
          toast.error(result.message || 'Something went wrong');
        }
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
                    <h5>Create Members</h5>
                    <Link to="/admin/members" className="btn btn-primary">
                      Back
                    </Link>
                  </div>
                  <hr className="pb-2" />

                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                        Name
                      </label>
                      <input
                        id="name"
                        {...register('name', {
                          required: 'Name is required',
                        })}
                        className={`form-control ${errors.name && 'is-invalid'}`}
                        rows="3"
                      ></input>

                      {errors.name && (
                        <p className="invalid-feedback">
                          {errors.name?.message}
                        </p>
                      )}
                    </div>

                    <div className="mb-3">
                      <label htmlFor="designation" className="form-label">
                        Designation
                      </label>
                      <input
                        id="designation"
                        {...register('designation', {
                          required: 'Designation is required',
                        })}
                        type="text"
                        className={`form-control ${errors.designation && 'is-invalid'}`}
                      />
                      {errors.designation && (
                        <p className="invalid-feedback">
                          {errors.designation?.message}
                        </p>
                      )}
                    </div>

                    <div className="mb-3">
                      <label htmlFor="linkedin_url" className="form-label">
                        LinkedIn Url
                      </label>
                      <input
                        id="linkedin_url"
                        {...register('linkedin_url', {
                          pattern: {
                            value: /^(https?:\/\/)?(www\.)?linkedin\.com\/.*$/,
                            message: 'Please enter a valid LinkedIn URL',
                          },
                        })}
                        type="text"
                        className={`form-control ${errors.linkedin_url && 'is-invalid'}`}
                      />
                      {errors.linkedin_url && (
                        <p className="invalid-feedback">
                          {errors.linkedin_url?.message}
                        </p>
                      )}
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
