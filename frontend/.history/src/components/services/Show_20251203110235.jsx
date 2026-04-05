import React, { useState, useEffect } from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Sidebar from '../common/Sidebar';
import { apiUrl, token } from '../common/http';

const Show = () => {
    const [services, setServices] = useState([]);

    const fetchServices = async () => {
        const res = await fetch(`${apiUrl}/services`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${token()}`,
            },
        });

        const result = await res.json();
        console.log(result);
        setServices(result);
        // setServices(result.data || []); // <-- use result.data (array)
    };

    useEffect(() => {
        fetchServices();
    }, []);

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
                                        <h5>Services</h5>
                                        <a href="" className="btn btn-primary">Create</a>
                                    </div>
                                    <hr />
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>ID</th><th>Name</th><th>Slug</th><th>Status</th><th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {services.map((service) => (
                                                <tr key={service.id}>
                                                    <td>{service.id}</td>
                                                    <td>{service.title}</td>
                                                    <td>{service.slug}</td>
                                                    <td>{service.status}</td>
                                                    <td>
                                                        <a href="" className="btn btn-sm btn-info me-2">Edit</a>
                                                        <a href="" className="btn btn-sm btn-danger">Delete</a>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
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

export default Show;
