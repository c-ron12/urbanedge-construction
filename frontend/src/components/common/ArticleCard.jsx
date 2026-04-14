import { Link } from 'react-router-dom';
import { fileUrl } from './http';

// This is the same "ArticleCard" passed in the map function in LatestArticles.jsx.
const ArticleCard = ({ article }) => {
  return (
    <>
      <div className="col-lg-4 col-md-6 mb-5 gx-md-5 gx-4">
        <div className="card shadow border-0 h-100">
          <div className="card-img-top">
            {
              article?.image && (
                <img
                  src={`${fileUrl}/uploads/articles/small/${article.image}`}   
                className="w-100"
                alt="Articles & Blogs Image"
              />
              ) 
            }
            
          </div>
          <div className="card-body py-4">
            <div className="pb-1">
              <Link to={`/blog/${article?.id}`} className="blog-title">
                {article?.title}
              </Link>
            </div>

            <Link
              to={`/blog/${article?.id}`}
              href="#"
              className="btn btn-primary blog-readmore-btn mt-3 small-btn"
            >
              Read More
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticleCard;