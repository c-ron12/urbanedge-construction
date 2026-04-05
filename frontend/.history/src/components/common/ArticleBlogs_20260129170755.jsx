import BlogImg from '../../assets/images/construction121.jpg';
import BlogImg1 from '../../assets/images/construction12121.jpg';
import BlogImg2 from '../../assets/images/construction11.png';
import { apiUrl } from './http';

// SHOW LATEST ARTICLES AND BLOGS ON HOME PAGE.
const ArticleBlogs = () => {
  const [articleBlogs, setArticleBlogs] = React.useState([]);

  // Api call to fetch latest 3 blogs.
  const fetchArticleBlogs = async () => {
    const res = await fetch(`${apiUrl}/get-lates-blogs?limit=3`, {
      method: 'GET',
    });
    const result = await res.json();
    // console.log(result);
    setArticleBlogs(result.data); // data is coming from backend api response latestBlogs function of frontend/BlogsController.
  };

  React.useEffect(() => {
    fetchArticleBlogs();
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
          <div className="row pt-5 justify-content-center">
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
          </div>
        </div>
      </section>
    </>
  );
};

export default ArticleBlogs;
