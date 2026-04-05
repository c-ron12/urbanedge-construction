import React from 'react';
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import Sidebar from '../../common/Sidebar';
import { apiUrl, token } from '../../common/http'; // apiUrl is defined in src/components/common/http.js.
import { Link } from 'react-router-dom'; // usinf link instead of anchor tag to avoid page reload.
import { toast } from 'react-toastify';


const show = () => {
  const [members, setMembers] = React.useState([]); // state to store members list, used in table below and in delete function.

  // FETCH memberS FROM BACKEND API.
  const fetchMembers = async () => {
    const res = await fetch(`${apiUrl}/members`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token()}`,
      },
    });

    const result = await res.json();
    console.log(result);
    // setMembers(result);
    setMembers(result.data || []); // <-- use result.data (array).. data is coming from backend API response memberController@index.
  };

    const deleteMember = async (id) => {
      // function to delete member by id.

      if (confirm('Are you sure you want to delete this member?')) {
        const res = await fetch(`${apiUrl}/members/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token()}`,
          },
        });
        const result = await res.json();
  
        if (result.status === true) {
          //  It filters the current 'member' array stored in component state).
          // It keeps every member whose 'id' does NOT match the 'id' of the member that was just deleted.
          const filteredmembers = members.filter(
            (member) => member.id !== id
          ); // remove deleted member from state.
          
          setmembers(filteredmembers);
          toast.success(result.message);   // message is coming backend API response from memberController@destroy.
        } else {
          toast.error(result.message);
        }
      }
    };

  React.useEffect(() => {
    fetchMembers();
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
                    <h5>members</h5>
                    <Link
                      to="/admin/members/create"
                      className="btn btn-primary"
                    >
                      Create
                    </Link>
                  </div>
                  <hr />
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Slug</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {members &&
                        members.map((member) => (
                          <tr key={member.id}>
                            <td>{member.id}</td>
                            <td>{member.title}</td>
                            <td>{member.slug}</td>

                            <td>
                              {member.status == 1 ? 'Active' : 'Inactive'}
                            </td>

                            <td>
                              <Link
                                to={`/admin/members/edit/${member.id}`} // member is the variable from map function.
                                className="btn btn-sm btn-info me-2"
                              >
                                Edit
                              </Link>
                              <Link
                                onClick={() => deletemember(member.id)}
                                href="#"
                                className="btn btn-sm btn-danger"
                              >
                                Delete
                              </Link>
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

export default show;
