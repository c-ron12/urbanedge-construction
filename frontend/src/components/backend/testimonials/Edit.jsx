import React from 'react';
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import Sidebar from '../../common/Sidebar';
import { useForm } from 'react-hook-form';
import { fileUrl } from '../../common/http';
import { toast } from 'react-toastify';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

import { request } from '../../common/httpClient';
import { getErrorMessage } from '../../common/apiErrorHandler';
import { useFormHelpers } from '../../../hooks/useFormHelpers';

const Edit = () => {
  // Router Hooks, useParams to get testimonial id from URL, useNavigate to navigate programmatically after successful update.
  const params = useParams();
  const navigate = useNavigate();

  // Custom Hooks, Reusable logic for image upload and form handling
  const { isDisabled, setIsDisabled, imageId, imagePreview, handleFile, handleClearImage } =
    useFormHelpers();

  // Local State, used for storing fetched testimonial data and loading state while fetching data.
  const [loading, setLoading] = React.useState(true);
  const [testimonial, setTestimonial] = React.useState(null);

  // --- React Hook Form ---
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // used to set default values after fetching data
  } = useForm();

  // --- Fetch testimonial data on component mount ---
  React.useEffect(() => {
    const fetchTestimonial = async () => {
      setLoading(true); // start loading, show loading spinner

      // --- API call to fetch testimonial by id ---
      try {
        const result = await request(`testimonials/${params.id}`);

        if (result.status === false) {
          toast.error('Failed to fetch testimonial');
          setLoading(false); // stop loading
          return;
        }

        setTestimonial(result.data); // Store fetched testimonial data in state, data is coming from backend api admin/testimonialController@show.

        // set default filled values after fetching data
        reset({
          testimonial: result.data.testimonial,
          citation: result.data.citation,
          designation: result.data.designation,
          status: result.data.status,
        });
      } catch (error) {
        toast.error(getErrorMessage(error, 'Failed to fetch testimonial'));
      } finally {
        setLoading(false); // stop loading, hide loading spinner
      }
    };

    fetchTestimonial();
  }, [params.id, reset]); //// params.id is testimonial id from URL and reset is used to reset form default values

  // --- Form submit handler ---
  const onSubmit = async (data) => {
    // data is a parameter and the value it receives is object of all form data.

    setIsDisabled(true); // ADD THIS to disable submit button immediately when form is submitted, to prevent multiple submissions.

    const newData = {
      ...data,
      imageId: imageId ? imageId : testimonial?.image ? null : 'clear',
    };
    // newData is variable and the value it receives is object of all form data + imageId which is id of newly uploaded image, this newData will be sent to backend API for updating testimonial, in testimonialController.php, update() method.

    // --- API call to edit service ---
    try {
      const result = await request(`testimonials/${params.id}`, {
        method: 'PUT',
        body: JSON.stringify(newData),
      });

      if (result.status === true) {
        toast.success(result.message); // message is coming from backend API response from admin/ServiceController.php, update() method.

        navigate('/admin/testimonials');
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
                    <h5>Edit Testimonials</h5>
                    <Link to="/admin/testimonials" className="btn btn-primary">
                      Back
                    </Link>
                  </div>
                  <hr className="pb-2" />

                  {/* --- Show spinner while loading testimonial data --- */}
                  {loading ? (
                    <div className="text-center my-5">
                      <Spinner animation="border" variant="primary" />
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit(onSubmit)}>
                      {/* Testimonial field */}
                      <div className="mb-3">
                        <label htmlFor="testimonial" className="form-label">
                          Testimonials
                        </label>
                        <textarea
                          id="testimonial"
                          {...register('testimonial', {
                            required: 'Testimonial is required',
                            minLength: {
                              value: 10,
                              message:
                                'Testimonial must be at least 10 characters',
                            },
                          })}
                          className={`form-control ${
                            errors.testimonial && 'is-invalid'
                          }`}
                          rows="3"
                        ></textarea>
                        {errors.testimonial && (
                          <p className="invalid-feedback">
                            {errors.testimonial.message}
                          </p>
                        )}
                      </div>

                      {/* Citation field */}
                      <div className="mb-3">
                        <label htmlFor="citation" className="form-label">
                          Citation
                        </label>
                        <input
                          id="citation"
                          type="text"
                          {...register('citation', {
                            required: 'Citation is required',
                            minLength: {
                              value: 3,
                              message: 'Citation must be at least 3 characters',
                            },
                          })}
                          className={`form-control ${
                            errors.citation && 'is-invalid'
                          }`}
                        />
                        {errors.citation && (
                          <p className="invalid-feedback">
                            {errors.citation.message}
                          </p>
                        )}
                      </div>

                      {/* Designation field */}
                      <div className="mb-3">
                        <label htmlFor="designation" className="form-label">
                          Designation
                        </label>
                        <input
                          id="designation"
                          type="text"
                          {...register('designation')}
                          className="form-control"
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

                        {/* --- CASE A: NEW IMAGE PREVIEW WRAPPER --- */}
                        {imagePreview ? (
                          <div className="image-preview-wrapper">
                            <img
                              src={imagePreview}
                              alt="New Preview"
                              className="img-fluid preview-img"
                            />
                            <button
                              type="button"
                              onClick={() => handleClearImage('image')}
                              className="btn btn-danger btn-sm position-absolute btn-remove-image"
                              title="Remove new image"
                            >
                              ✕
                            </button>
                          </div>
                        ) : testimonial?.image ? (
                          /* --- CASE B: EXISTING DATABASE IMAGE WRAPPER --- */
                          <div className="image-preview-wrapper">
                            <img
                              src={`${fileUrl}/uploads/testimonials/small/${testimonial?.image}`}
                              alt="Old Preview"
                              className="img-fluid preview-img"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                handleClearImage('image', () =>
                                  setTestimonial((prev) => ({
                                    ...prev,
                                    image: null,
                                  }))
                                )
                              }
                              className="btn btn-danger btn-sm position-absolute btn-remove-image"
                              title="Remove current image"
                            >
                              ✕
                            </button>
                          </div>
                        ) : null}
                      </div>

                      {/* Status field */}
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

                      {/* Submit button with spinner inside */}
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
