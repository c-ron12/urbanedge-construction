import OurProject1 from '../../assets/images/projectPic1.png';
import OurProject2 from '../../assets/images/projectPic2.jpg';
import OurProject3 from '../../assets/images/projectPic3.jpg';
import OurProject4 from '../../assets/images/projectPic4.jpg';

// SHOW ALL PROJECTS ON PROJECTS PAGE
const Projects = () => {
  const [projects, setProjects] = React.useState([]);
  
    // Api call to fetch all projects
    const fetchAllProjects = async () => {
      const res = await fetch(`${apiUrl}/get-projects`, {
        method: 'GET',
      });
  
      const result = await res.json();
      // console.log(result);
      setProjects(result.data);
    };
  
    React.useEffect(() => {
      fetchAllProjects();
    }, []);
  return (
    <>
      <section className="section-3 bg-light pt-5 pb-1 pb-md-4">
        <div className="container-fluid pt-lg-5 pt-3 pb-4">
          <div className="section-header text-center">
            <span>Our Projects</span>
            <h2>Discover our diverse range of projects</h2>
            <p>
              A showcase of our commitment to quality craftsmanship and client
              satisfaction.
            </p>
          </div>

          <div className="row pt-5">
            <div className="col-lg-3 col-md-6 pb-5">
              <div className="item">
                <div className="service-image">
                  <img
                    src={OurProject1}
                    className="w-100"
                    alt="The Crestview Residence"
                  />
                </div>
                <div className="service-body">
                  <div className="service-title">
                    <h3>The Crestview Residence</h3>
                  </div>
                  <div className="service-content">
                    Creating the perfect home for you is our passion. With our
                    Custom Home Constructions service, we bring your unique
                    vision to life, building a home that is truly yours.
                  </div>
                  <a href="#" className="btn btn-primary mt-4 small-btn">
                    Read More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Projects;
