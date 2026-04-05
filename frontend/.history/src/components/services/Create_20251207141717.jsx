import React from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Sidebar from '../common/Sidebar';
import { useForm } from 'react-hook-form';

import { Link } from 'react-router-dom';

const Create = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    // console.log(data);
     const res = await fetch(`${apiUrl}/services`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Bearer ${token()}`,
                },
            });

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
                    <h5>Create Services</h5>
                    <Link to="/admin/services" className="btn btn-primary">
                      Back
                    </Link>
                  </div>
                  <hr />

                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <input
                        {...register('title', {
                          required: 'Name is required',
                          minLength: {
                            value: 3,
                            message: 'Name must be at least 3 characters',
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
                      <label className="form-label">Slug</label>
                      <input
                        {...register('slug', {
                          required: 'Slug is required',
                        })}
                        type="text"
                        className={`form-control ${errors.title && 'is-invalid'}`}
                      />
                      {errors.slug && (
                        <p className="invalid-feedback">
                          {errors.slug?.message}
                        </p>
                      )}
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <textarea
                        {...register('short_desc')}
                        className="form-control"
                        rows={4}
                      ></textarea>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Content</label>
                      <input
                        {...register('content')}
                        type="text"
                        className="form-control"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Status</label>
                      <select {...register('status')} className="form-select">
                        <option value="1">Active</option>
                        <option value="0">Inactive</option>
                      </select>
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Submit
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
