import React from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Sidebar from '../common/Sidebar';

import { Link } from 'react-router-dom';


const Create = () => {
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

                  <form>
                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <input type="text" className="form-control" />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Slug</label>
                      <input type="text" className="form-control" />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <textarea className="form-control" rows={4}></textarea>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Content</label>
                      <input type="text" className="form-control" />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Status</label>
                      <select className="form-select">
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
