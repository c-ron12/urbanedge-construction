import BlogImg from '../../assets/images/construction121.jpg';
import BlogImg1 from '../../assets/images/construction12121.jpg';
import BlogImg2 from '../../assets/images/construction11.png';
import { apiUrl } from './http';
use React from 'react';

// SHOW LATEST ARTICLES AND BLOGS ON HOME PAGE.
const ArticlesBlogs = () => {
  const [articlesBlogs, setArticlesBlogs] = React.useState([]);

  // Api call to fetch latest 3 blogs.
  const fetchArticlesBlogs = async () => {
    const res = await fetch(`${apiUrl}/get-latest-articles-blogs?limit=3`, {
      method: 'GET',
    });
    const result = await res.json();
    // console.log(result);
    setArticlesBlogs(result.data); // data is coming from backend api response latestBlogs function of frontend/BlogsController.
  };

  React.useEffect(() => {
    fetchArticlesBlogs();
  }, []);

  return (
    <>
      <section className="section-6 bg-light pt-5 pb-md-4">
        <div className="container pt-lg-5 pt-3 pb-4">
          <div className="section-header text-center">
            <span>Article and Blogs</span>
            <h2>Explore Our Latest Stories</h2>
            <p>
              Discover the latest updates, stories, and insights to keep you
              informed and inspired.
            </p>
          </div>

          {/* <div className="row pt-5 justify-content-center">
            <div className="col-lg-4 col-md-6 mb-5 gx-5">
              <div className="card shadow border-0 h-100">
                <div className="card-img-top">
                  <img src={BlogImg} alt="" className="w-100" />
                </div>
                <div className="card-body py-4">
                  <div className="pb-1">
                    <a href="" className="blog-title">
                      Shaping Strong Foundations for Tomorrow
                    </a>
                  </div>

                  <p className="card-text">
                    Stay updated with our latest construction projects,
                    innovations, and expert insights that define the future of
                    durable and sustainable building solutions.
                  </p>

                  <a
                    href="#"
                    className="btn btn-primary blog-readmore-btn small-btn"
                  >
                    Read More
                  </a>
                </div>
              </div>
            </div>
          </div> */}

          <div className="row pt-5">
            {articlesBlogs &&
              articleBlogs.map((articlesBlogs) => {
                return (
                  <div key={project.id} className="col-lg-3 col-sm-6 pb-5">
                    <div className="item">
                      <div className="service-image">
                        <img
                          src={`${fileUrl}/uploads/projects/small/${articlesBlogs.image}`}
                          className="w-100"
                          alt="Custom Home Construction"
                        />
                      </div>
                      <div className="service-body">
                        <div className="service-title">
                          <h3>{articlesBlogs.title}</h3>
                        </div>
                        <div className="service-content">
                          <p>{articlesBlogs.short_desc}</p>
                        </div>
                        <a
                          href="#"
                          className="btn btn-primary service-readmore-btn mt-4 small-btn"
                        >
                          Read More
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    </>
  );
};

export default ArticlesBlogs;
