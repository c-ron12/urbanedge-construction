import React from 'react';
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import Sidebar from '../../common/Sidebar';
import { useForm } from 'react-hook-form';
import { apiUrl, token, fileUrl } from '../../common/http'; // apiUrl and fileUrl is defined in src/components/common/http.js.
import { toast } from 'react-toastify';
import { Link, useNavigate, useParams } from 'react-router-dom'; // using useParams to get member id from url.

const Edit = () => {
  const [isDisabled, setIsDisabled] = React.useState(false); // to disable submit button during image upload, false by default means button is enabled.
  const [imageId, setImageId] = React.useState(null); // to store uploaded image id.
  const params = useParams(); // to get member id from url.
  const [member, setmember] = React.useState(''); // to store fetched member data, used to show existing image below image upload field
  const [imagePreview, setImagePreview] = React.useState(null); // to store uploaded image preview url.

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: async () => {
      // to set default filled values in form fields by fetching data from backend api.
      const res = await fetch(`${apiUrl}/members/${params.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token()}`,
        },
      });

      const result = await res.json();
      setmember(result.data); // to store fetched member data in state, data is coming from backend api memberController@show.

      return {
        name: result.data.name,
        designation: result.data.designation,
        linkedin_url: result.data.linkedin_url,
        status: result.data.status,
      };
    },
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    // data is a parameter and the value it receives is object of all form data.
    const newData = { ...data, imageId: imageId };
    // newData is variable and the value it receives is object of all form data + content from wysiwyg editor.

    const res = await fetch(`${apiUrl}/members/${params.id}`, {
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
      toast.success(result.message); // message is coming from backend API response from memberController.php, update() method.
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
                    <h5>Edit Members</h5>
                    <Link to="/admin/members" className="btn btn-primary">
                      Back
                    </Link>
                  </div>
                  <hr className="pb-2" />

                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <input
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
                      <label className="form-label">Designation</label>
                      <input
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
                      <label className="form-label">LinkedIn Url</label>
                      <input
                        {...register('linkedin_url')}
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

export default Edit;
