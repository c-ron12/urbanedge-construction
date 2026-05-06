import React from 'react';
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import Sidebar from '../../common/Sidebar';
import { useForm } from 'react-hook-form';
import { apiUrl, token, fileUrl } from '../../common/http';
import { toast } from 'react-toastify';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

import { request } from '../../common/httpClient';
import { getErrorMessage } from '../../common/apiErrorHandler';

const Edit = () => {
  const params = useParams(); // get member id from URL
  const navigate = useNavigate();

  // --- State ---
  const [loading, setLoading] = React.useState(true); // true while fetching member data
  const [isDisabled, setIsDisabled] = React.useState(false); // true while submitting/updating or uploading image
  const [member, setMember] = React.useState(''); // store fetched member
  const [imagePreview, setImagePreview] = React.useState(null); // store uploaded image preview
  const [imageId, setImageId] = React.useState(null); // store uploaded image id

  // --- React Hook Form ---
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // used to set default values after fetching data
  } = useForm();

  // --- Fetch member data on component mount ---
  React.useEffect(() => {
    const fetchMember = async () => {
      setLoading(true); // start loading, show loading spinner

      // --- API call to fetch member by id ---
      try {
        const result = await request(`${apiUrl}/members/${params.id}`);

        if (result.status === false) {
          toast.error('Failed to fetch member');
          setLoading(false); // stop loading
          return;
        }

        setMember(result.data); // Store fetched member data in state, data is coming from backend api admin/memberController@show.

        // set default filled values after fetching data
        reset({
          name: result.data.name,
          designation: result.data.designation,
          linkedin_url: result.data.linkedin_url,
          status: result.data.status,
        });
      } catch (error) {
        toast.error(getErrorMessage(error, 'Failed to fetch member'));
      } finally {
        setLoading(false); // stop loading, hide loading spinner
      }
    };

    fetchMember();
  }, [params.id, reset]); //// params.id is member id from URL and reset is used to reset form default values

  // --- Form submit handler ---
  const onSubmit = async (data) => {
    // data is a parameter and the value it receives is object of all form data.

    setIsDisabled(true); // disable submit button immediately

    const newData = { ...data, imageId: imageId };
    // newData is variable and the value it receives is object of all form data + imageId which is id of newly uploaded image, this newData will be sent to backend API for updating member, in memberController.php, update() method.

    // --- API call to edit member ---
    try {
      const result = await request(`${apiUrl}/members/${params.id}`, {
        method: 'PUT',
        body: JSON.stringify(newData),
      });

      if (result.status === true) {
        toast.success(result.message); // message is coming from backend API response from admin/ServiceController.php, update() method.

        navigate('/admin/members'); // navigate back to members list after successful update
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(getErrorMessage(error, 'Update failed'));
    } finally {
      setIsDisabled(false); // false here means, RE-ENABLE THE SUBMIT BUTTON after API call is finished, whether it succeeded or failed. This ensures the user can try again if there was an error.
    }
  };

  // --- Image upload handler ---
  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImagePreview(URL.createObjectURL(file)); // show image preview immediately

    setIsDisabled(true);

    const formData = new FormData(); // FormData is built-in JS object to handle file uploads

    formData.append('image', file);

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
      setIsDisabled(false); // // false here means, RE-ENABLE THE SUBMIT BUTTON after API call is finished, whether it succeeded or failed. This ensures the user can try again if there was an error.
    }
  };

  return (
    <>
      {/* bgClass is the prop coming from Header component, it adds light background to header in this page.*/}
      <Header bgClass="bg-light" />

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
                    <h5>Edit Members</h5>
                    <Link to="/admin/members" className="btn btn-primary">
                      Back
                    </Link>
                  </div>
                  <hr className="pb-2" />

                  {/* --- Show spinner while loading member data --- */}
                  {loading ? (
                    <div className="text-center my-5">
                      <Spinner animation="border" variant="primary" />
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit(onSubmit)}>
                      {/* Name field */}
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
                        />
                        {errors.name && (
                          <p className="invalid-feedback">
                            {errors.name.message}
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
                          {...register('designation', {
                            required: 'Designation is required',
                          })}
                          className={`form-control ${errors.designation && 'is-invalid'}`}
                        />
                        {errors.designation && (
                          <p className="invalid-feedback">
                            {errors.designation.message}
                          </p>
                        )}
                      </div>

                      {/* LinkedIn URL field */}
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

                      {/* Image upload field */}
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
                                width: '100px',
                                borderRadius: '8px',
                                height: 'auto',
                              }}
                            />
                          </div>
                        ) : member.image ? (
                          <div className="mt-3">
                            <img
                              src={`${fileUrl}/uploads/members/small/${member.image}`}
                              alt="Old"
                              style={{
                                width: '100px',
                                borderRadius: '8px',
                                height: 'auto',
                              }}
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
