import React from 'react';
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import Sidebar from '../../common/Sidebar';
import { useForm } from 'react-hook-form';
import { apiUrl, token, fileUrl } from '../../common/http'; // apiUrl is defined in src/components/common/http.js.

import { toast } from 'react-toastify';
import { Link, useNavigate, useParams } from 'react-router-dom'; // using useParams to get project id from url.
import JoditEditor from 'jodit-react'; // WYSIWYG editor.

// CREATE PROJECT FORM.
const Edit = ({ placeholder = 'content' }) => {
  // The placeholder prop is used to customize the text hint displayed in the Jodit Editor.
  const editor = React.useRef(null); // ref for wising editor.
  const [content, setContent] = React.useState(''); // content for wising editor.
  const [project, setProject] = React.useState([]); // to store fetched project data.
  const [isDisabled, setIsDisabled] = React.useState(false); // to disable submit button during image upload, false by default means button is enabled.
  const [imageId, setImageId] = React.useState(null); // to store uploaded image id.
  const [imagePreview, setImagePreview] = React.useState(null); // to store uploaded image preview url.

  const config = React.useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || 'Content',
    }),
    [placeholder]
  );

  const params = useParams(); // to get project id from browser url.

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // to set default filled values in form fields by fetching data from backend api.
    defaultValues: async () => {
      const res = await fetch(`${apiUrl}/projects/${params.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token()}`,
        },
      });
      const result = await res.json();
      setContent(result.data.content); // to set content in wising editor from fetched data.
      setProject(result.data); // to store fetched project data in state, data is coming from backend api ProjectController@show.

      return {
        title: result.data.title,
        slug: result.data.slug,
        author: result.data.author,
        location: result.data.location,
        construction_type: result.data.construction_type,
        sector: result.data.sector,
        short_desc: result.data.short_desc,
        status: result.data.status,
      };
    },
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    //// data is a parameter and the value it receives is object of all form data.
    // console.log(data);.

    const newData = { ...data, content: content, imageId: imageId };
    //  ...data means all data from form, content is wising editor data, imageId is uploaded image id that we are getting from handleFile function in below.
    // newData is variable and the value it receives is object of all form data + content from wysiwyg editor.

    // --- API Call to Edit Project ---.
    const res = await fetch(`${apiUrl}/projects/${params.id}`, {
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
      // status coming from backend api response.
      toast.success(result.message); // message is coming backend API response from ProjectController.php, update() method.
      navigate('/admin/projects');
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
                    <h5>Edit Projects</h5>
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
                          <option value="Health">Residental</option>
                          <option value="Education">Industrial</option>
                          <option value="Corporate">Corporate</option>
                          <option value="Health">Health</option>
                          <option value="Education">Education</option>
                          <option value="Corporate">Hospitality</option>
                          <option value="Corporate">Mixed-Use</option>
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
                        key={project.id} // Important for re-rendering with fetched data.
                        ref={editor}
                        value={content}
                        config={config}
                        tabIndex={1}
                        onBlur={(newContent) => setContent(newContent)}
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
                              width: '200px',
                              borderRadius: '8px',
                              height: 'auto',
                            }}
                          />
                        </div>
                      ) : project.image ? (
                        <div className="mt-3">
                          <img
                            src={`${fileUrl}/uploads/projects/small/${project.image}`}
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

                    <button disabled={isDisabled} className="btn btn-primary">
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
