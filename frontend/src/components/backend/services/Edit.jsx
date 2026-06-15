import React from 'react';
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import Sidebar from '../../common/Sidebar';
import { useForm } from 'react-hook-form';
import { fileUrl } from '../../common/http';
import { toast } from 'react-toastify';
import { Link, useNavigate, useParams } from 'react-router-dom'; // using useParams to get service id from url.
import { Spinner } from 'react-bootstrap';
import JoditEditor from 'jodit-react'; // WYSIWYG editor.

import { request } from '../../common/httpClient';
import { getErrorMessage } from '../../common/apiErrorHandler';
import { useFormHelpers } from '../../../hooks/useFormHelpers';

const Edit = () => {
  // Router Hooks, useParams to get service id from URL, useNavigate to navigate programmatically after successful update.
  const params = useParams();
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

  // Local states
  const [loading, setLoading] = React.useState(true);
  const [service, setService] = React.useState({});

  const config = React.useMemo(
    () => ({
      readonly: false,
    }),
    [placeholder]
  );

  // --- React Hook Form ---
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Fetch service data on component mount
  React.useEffect(() => {
    const fetchService = async () => {
      setLoading(true); // start loading, show loading spinner

      // --- API call to fetch service by id ---
      try {
        const result = await request(`services/${params.id}`);

        if (result.status === false) {
          toast.error('Failed to fetch service');
          setLoading(false); // stop loading
          return;
        }

        setService(result.data); // Store fetched service data in state, data is coming from backend api admin/serviceController@show.
        setContent(result.data.content); // Set content in wising editor from fetched data.

        // set default filled values after fetching data
        reset({
          title: result.data.title,
          slug: result.data.slug,
          short_desc: result.data.short_desc,
          status: result.data.status,
        });
      } catch (error) {
        toast.error(getErrorMessage(error, 'Failed to fetch service'));
      } finally {
        setLoading(false); // stop loading, hide loading spinner
      }
    };

    fetchService();
  }, [params.id, reset]); //// params.id is service id from URL and reset is used to reset form default values

  // --- Form submit handler ---
  const onSubmit = async (data) => {
    // data is a parameter and the value it receives is object of all form data.

    setIsDisabled(true); // ADD THIS to disable submit button immediately when form is submitted, to prevent multiple submissions.

    const newData = { ...data, content: content, imageId: imageId };
    // newData is variable and the value it receives is object of all form data + imageId which is id of newly uploaded image, this newData will be sent to backend API for updating testimonial, in testimonialController.php, update() method.

    // --- API call to edit service ---
    try {
      const result = await request(`services/${params.id}`, {
        method: 'PUT',
        body: JSON.stringify(newData),
      });

      if (result.status === true) {
        toast.success(result.message); // message is coming from backend API response from admin/ServiceController.php, update() method.

        navigate('/admin/services');
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
      {/* bgClass is the prop coming from Header component, it adds light background to header in this page.*/}
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
                    <h5>Edit Services</h5>
                    <Link to="/admin/services" className="btn btn-primary">
                      Back
                    </Link>
                  </div>
                  <hr className="pb-2" />

                  {loading ? (
                    <div className="text-center my-5">
                      <Spinner animation="border" variant="primary" />{' '}
                      {/* spinner while fetching data */}
                    </div>
                  ) : (
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
                        <label htmlFor="short_desc" className="form-label">
                          Short Description (Summary for Cards)
                        </label>
                        <textarea
                          id="short_desc"
                          {...register('short_desc')}
                          className="form-control"
                          placeholder="Brief summary..."
                          rows="3"
                        ></textarea>
                      </div>

                      <div className="mb-3">
                        <label htmlFor="description" className="form-label">
                          Description (Full Content)
                        </label>
                        <JoditEditor
                          id="description"
                          key={service.id}
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

                        {imagePreview ? (
                          <div className="mt-3">
                            <img
                              src={imagePreview}
                              alt="New Preview"
                              style={{
                                width: '200px',
                                borderRadius: '8px',
                                height: 'auto',
                              }}
                            />
                          </div>
                        ) : service.image ? (
                          <div className="mt-3">
                            <img
                              src={`${fileUrl}/uploads/services/small/${service.image}`}
                              alt="Old"
                              style={{
                                width: '200px',
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
