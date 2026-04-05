import React from 'react';
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import Sidebar from '../../common/Sidebar';
import { useForm } from 'react-hook-form';
import { apiUrl, token } from '../../common/http'; // apiUrl is defined in src/components/common/http.js.

import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

// CREATE m ember FORM.
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

  const onSubmit = async (data) => {
    // data is a parameter and the value it receives is object of all form data.
    // console.log(data);.

    const newData = { ...data, imageId: imageId };
    //  ...data means all data from form, imageId is uploaded image id that we are getting from handleFile function in below
    // newData is variable and the value it receives is object of all form data.

    // --- API Call to Create member ---.
    const res = await fetch(`${apiUrl}/members`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token()}`,
      },
      body: JSON.stringify(newData),
    });

    const result = await res.json();

    if (result.status === true) {
      toast.success(result.message); // message is coming from backend API response from memberController.php, store() method.
      navigate('/admin/members');
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
                    <h5>Create Members</h5>
                    <Link to="/admin/members" className="btn btn-primary">
                      Back
                    </Link>
                  </div>
                  <hr className="pb-2" />

                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <textarea
                        {...register('name', {
                          required: 'Name is required',
                        })}
                        className={`form-control ${errors.name && 'is-invalid'}`}
                        rows="3"
                      ></textarea>

                      {errors.name && (
                        <p className="invalid-feedback">
                          {errors.name?.message}
                        </p>
                      )}
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Citation</label>
                      <input
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
                      <label className="form-label">Designation</label>
                      <input
                        {...register('designation')}
                        type="text"
                        className="form-control"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Image</label>
                      <input
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
                              width: '150px',
                              height: 'auto',
                              borderRadius: '8px',
                            }}
                          />
                        </div>
                      )}
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Status</label>
                      <select {...register('status')} className="form-select">
                        <option value="1">Active</option>
                        <option value="0">Inactive</option>
                      </select>
                    </div>

                    <button disabled={isDisabled} className="btn btn-primary">
                      {/* Button text changes to show background activity.*/}
                      {isDisabled ? 'Please wait...' : 'Submit'}
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
