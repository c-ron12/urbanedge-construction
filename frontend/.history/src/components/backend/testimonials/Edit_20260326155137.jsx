// testimonials/Edit.jsx
import React from 'react';
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import Sidebar from '../../common/Sidebar';
import { useForm } from 'react-hook-form';
import { apiUrl, token, fileUrl } from '../../common/http';
import { toast } from 'react-toastify';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

const Edit = () => {
  const params = useParams(); // get testimonial id from URL
  const navigate = useNavigate();

  // --- State ---
  const [loading, setLoading] = React.useState(true); // true while fetching testimonial data
  const [isDisabled, setIsDisabled] = React.useState(false); // true while submitting/updating or uploading image
  const [testimonial, settestimonial] = React.useState(''); // store fetched testimonial
  const [imagePreview, setImagePreview] = React.useState(null); // store uploaded image preview
  const [imageId, setImageId] = React.useState(null); // store uploaded image id

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
      setLoading(true);
      try {
        const res = await fetch(`${apiUrl}/testimonials/${params.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token()}`,
          },
        });

        const result = await res.json();
        if (result.status === false) {
          toast.error('Failed to fetch testimonial');
          setLoading(false);
          return;
        }

        settestimonial(result.data); // to store fetched testimonial data in state, data is coming from backend api testimonialController@show.

        // set form default values after fetching data
        reset({
          testimonial: result.data.testimonial,
          citation: result.data.citation,
          designation: result.data.designation,
          status: result.data.status,
        });
      } catch (error) {
        toast.error('Failed to fetch testimonial');
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonial();
  }, [params.id, reset]);

  // --- Form submit handler ---
  const onSubmit = async (data) => {
    // data is a parameter and the value it receives is object of all form data.

    setIsDisabled(true); // ADDED THIS to disable submit button immediately when form is submitted, to prevent multiple submissions.

    const newData = { ...data, imageId: imageId };
    // newData is variable and the value it receives is object of all form data + content from wysiwyg editor.
    try {
      const res = await fetch(`${apiUrl}/testimonials/${params.id}`, {
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
        toast.success(result.message); // message is coming from backend API response from testimonialController.php, update() method.
        navigate('/admin/testimonials');
      } else {
        toast.error(result.message); 
      }
    } catch (error) {
      toast.error('Update failed');
    } finally {
      setIsDisabled(false);
    }
  };

  // --- Image upload handler ---
  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImagePreview(URL.createObjectURL(file));
    setIsDisabled(true);

    const formData = new FormData();
    formData.append('image', file);

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
        setImagePreview(null);
      } else {
        setImageId(result.data.id);
      }
    } catch (error) {
      toast.error('Image upload failed');
      setImagePreview(null);
    } finally {
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

                      {/* Image field */}
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
                              style={{ width: '150px', borderRadius: '8px' }}
                            />
                          </div>
                        ) : testimonial.image ? (
                          <div className="mt-3">
                            <img
                              src={`${fileUrl}/uploads/testimonials/small/${testimonial.image}`}
                              alt="Old"
                              style={{ width: '150px', borderRadius: '8px' }}
                            />
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
