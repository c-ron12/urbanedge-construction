import { apiUrl } from './http';
import React from 'react';
import { fileUrl } from './http';

const Team = () => {
  const [teamMembers, setTeamMembers] = React.useState([]);

  // Api call to fetch team members.
  const fetchTeamMembers = async () => {
    const res = await fetch(`${apiUrl}/get-members`, {
      method: 'GET',
    });
    const result = await res.json();
    setTeamMembers(result.data); // data is coming from backend api response index function of frontend/MemberController
  };

  React.useEffect(() => {
    fetchTeamMembers();
  }, []);

  return (
    <section className="section-8 pt-5 pb-md-4 bg-light">
      <div className="container-fluid pt-lg-5 pt-3 pb-4">
        <div className="section-header text-center">
          <span>Our Team</span>
          <h2>Meet the Experts Behind Our Success</h2>
          <p>
            Our team blends experience and dedication to transform ideas into
            reality.
          </p>
        </div>

        <div className="row pt-5 justify-content-center">
          {teamMembers &&
            teamMembers.map((member) => {
              return (
                <div key={member.id} className="col-lg-3 col-sm-6 mb-5 gx-5">
                  <div className="card shadow border-0 h-100">
                    <div className="card-img-top">
                      {/* <img
                        src={`${fileUrl}/uploads/members/small/${member?.image}`}
                        className="w-100"
                        alt="Team Member Image"
                      /> */}
                      {member.image && (
                        <img
                          src={`${fileUrl}/uploads/members/small/${member.image}`}  
                          className="w-100"
                          alt="Team Member Image"
                        />
                      )}
                            
                    </div>
                    <div className="card-body py-4">
                      <div className="card-title mb-0">
                        <p className="mb-1">{member?.name}</p>
                      </div>

                      <div className="card-subtitle mb-1 text-muted">
                        {member?.designation}
                      </div>

                      {member.linkedin_url && (
                        <a href={member.linkedin_url} target="_blank" rel="noopener noreferrer" className="linkedin-link">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-linkedin"
                            viewBox="0 0 16 16"
                          >
                            <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default Team;
