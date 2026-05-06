import React from 'react';
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import Sidebar from '../../common/Sidebar';
import { useForm } from 'react-hook-form';
import { apiUrl, token } from '../../common/http'; // apiUrl is defined in src/components/common/http.js.

import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

import { request } from '../../common/httpClient';
import { getErrorMessage } from '../../common/apiErrorHandler';

// CREATE MEMBER FORM.
const Create = () => {
  const [isDisabled, setIsDisabled] = React.useState(false); // to disable submit button during image upload, false by default means button is enabled.
  const [imageId, setImageId] = React.useState(null); // to store uploaded image id.
  const [imagePreview, setImagePreview] = React.useState(null); // to store uploaded image preview url.

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

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
      const result = await request(`${apiUrl}/members`, {
        method: 'POST',
        body: JSON.stringify(newData), // filled up form data is being sent as JSON string, backend will parse it and get the data in controller.
      });

      if (result.status === true) {
        toast.success(result.message); // message is coming from backend API response from ServiceController.php, store() method.
        navigate('/admin/members');
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(getErrorMessage(error)); // default fallback error message
    } finally {
      setIsDisabled(false); // false here means, RE-ENABLE THE SUBMIT BUTTON after API call is finished, whether it succeeded or failed. This ensures the user can try again if there was an error.
    }
  };

  // Image upload handler.
  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImagePreview(URL.createObjectURL(file)); // Show image preview immediately after file selection.

    setIsDisabled(true); // true means immediately disable the submit button during image upload, as soon as file is picked.

    const formData = new FormData(); // FormData is built-in JS object to handle file uploads, like image, PDF etc, it helps to send file data as multipart/form-data.

    formData.append('image', file); // image here is key and file is value

    // --- API call to upload image ---
    try {
      const result = await request(`${apiUrl}/temp-images`, {
        method: 'POST',
        body: formData, //  important: pass FormData directly
      });

      if (result.status === false) {
        toast.error(result.errors?.image?.[0] || 'Image upload failed');
        setImagePreview(null); // Clear preview if upload fails.
      } else {
        setImageId(result.data.id); // Store uploaded image id to use it during form submission, data and id are coming from backend API response from
      }
    } catch (error) {
      toast.error(getErrorMessage(error, 'Image upload failed'));
      setImagePreview(null); // Clear preview if upload fails.
    } finally {
      setIsDisabled(false); // false here means, RE-ENABLE THE SUBMIT BUTTON after API call is finished, whether it succeeded or failed. This ensures the user can try again if there was an error.
    }
  };

  return (
    <>
      <Header />

      <main>
        <div className="container my-sm-5 my-4 pt-5 pb-4">
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
                        {...register('linkedin_url')}
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
                      {imagePreview && (
                        <div className="mt-3">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            style={{
                              width: '100px',
                              height: 'auto',
                              borderRadius: '8px',
                            }}
                          />
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
