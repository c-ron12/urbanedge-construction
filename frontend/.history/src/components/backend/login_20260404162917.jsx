import React from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify'; // for toast notification.
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './context/Auth';

const Login = () => {
  const { login } = React.useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Handle form submission.
  const onSubmit = async (data) => {
    // data is a parameter and the value it receives is object of all form data.
    // console.log(data);.

    const res = await fetch('http://127.0.0.1:8000/api/authenticate', {
      // Use the fetch API to send a POST request to the service creation endpoint.
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Tells the server the body of the request is JSON data.
      },
      body: JSON.stringify(data), // Converts the JavaScript object data into a JSON string to be sent as the request body.
    });

    const result = await res.json();   // Parse the JSON response body from the server.
    // console.log(result);.
    if (result.status === false) {
      toast.error(result.message);
      return; // stop execution.
    }

    const userInfo = {
      id: result.id,
      token: result.token,
    };
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    login(userInfo);
    navigate('/admin/dashboard');
  };

  return (
    <>
      <Header />
      <main>
        <div className="container py-5">
          <div className="row login-form my-5 w-50 m-auto">
            <div className="card border-0 shadow">
              <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <h4 className="mb-4 text-center">Login Here</h4>

                  {/* Email Field */}
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      id="email"
                      {...register('email', {
                        required: 'This field is required',
                        pattern: {
                          value:
                            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                          message: 'Please enter a valid email address',
                        },
                      })}
                      type="email"
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      placeholder="Enter your email"
                    />
                    {errors.email && (
                      <p className="text-danger pt-2 invalid-feedback">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Password Field */}
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      id="password"
                      {...register('password', {
                        required: 'This field is required',
                        minLength: {
                          value: 6,
                          message: 'Password must be at least 6 characters',
                        },
                      })}
                      type="password"
                      className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                      placeholder="Enter your password"
                    />
                    {errors.password && (
                      <p className="text-danger pt-2 invalid-feedback">
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="text-center">
                    <button type="submit" className="btn btn-primary px-4">
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Login;
