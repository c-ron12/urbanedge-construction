import React from 'react';
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import Sidebar from '../../common/Sidebar';
import { useForm } from 'react-hook-form';
import { apiUrl, token, fileUrl } from '../../common/http'; // apiUrl and fileUrl is defined in src/components/common/http.js.
import { toast } from 'react-toastify';
import { Link, useNavigate, useParams } from 'react-router-dom'; // using useParams to get testimonial id from url.
import { Spinner } from 'react-bootstrap';

const Edit = () => {
  const [isDisabled, setIsDisabled] = React.useState(false); // to disable submit button during image upload, false by default means button is enabled.
  const [imageId, setImageId] = React.useState(null); // to store uploaded image id.
  const params = useParams(); // to get testimonial id from url.
  const [testimonial, settestimonial] = React.useState(''); // to store fetched testimonial data, used to show existing image below image upload field
  const [imagePreview, setImagePreview] = React.useState(null); // to store uploaded image preview url.

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: async () => {
      // to set default filled values in form fields by fetching data from backend api.
      const res = await fetch(`${apiUrl}/testimonials/${params.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token()}`,
        },
      });

      const result = await res.json();
      settestimonial(result.data); // to store fetched testimonial data in state, data is coming from backend api testimonialController@show.

      return {
        testimonial: result.data.testimonial,
        citation: result.data.citation,
        designation: result.data.designation,
        status: result.data.status,
      };
    },
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    // data is a parameter and the value it receives is object of all form data.

    setIsDisabled(true); // ADDED THIS to disable submit button immediately when form is submitted, to prevent multiple submissions.
    const newData = { ...data, imageId: imageId };
    // newData is variable and the value it receives is object of all form data + content from wysiwyg editor.

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
      setIsDisabled(false);
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
                    <h5>Edit Testimonials</h5>
                    <Link to="/admin/testimonials" className="btn btn-primary">
                      Back
                    </Link>
                  </div>
                  <hr className="pb-2" />

                  <form onSubmit={handleSubmit(onSubmit)}>
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
                        className={`form-control ${errors.testimonial && 'is-invalid'}`}
                        rows="3"
                      ></textarea>

                      {errors.testimonial && (
                        <p className="invalid-feedback">
                          {errors.testimonial?.message}
                        </p>
                      )}
                    </div>

                    <div className="mb-3">
                      <label htmlFor="citation" className="form-label">
                        Citation
                      </label>
                      <input
                        id="citation"
                        {...register('citation', {
                          required: 'Citation is required',
                          minLength: {
                            value: 3,
                            message: 'Citation must be at least 3 characters',
                          },
                        })}
                        type="text"
                        className={`form-control ${errors.citation && 'is-invalid'}`}
                      />
                      {errors.citation && (
                        <p className="invalid-feedback">
                          {errors.citation?.message}
                        </p>
                      )}
                    </div>

                    <div className="mb-3">
                      <label htmlFor="designation" className="form-label">
                        Designation
                      </label>
                      <input
                        id="designation"
                        {...register('designation')}
                        type="text"
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

                      {/* --- IMAGE PREVIEW SECTION --- */}
                      {imagePreview ? (
                        <div className="mt-3">
                          <img
                            src={imagePreview}
                            alt="New Preview"
                            style={{
                              width: '150px',
                              borderRadius: '8px',
                              height: 'auto',
                            }}
                          />
                        </div>
                      ) : testimonial.image ? (
                        <div className="mt-3">
                          <img
                            src={`${fileUrl}/uploads/testimonials/small/${testimonial.image}`}
                            alt="Old"
                            style={{
                              width: '150px',
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
