<div className="row pt-5 justify-content-center">
  {articles &&
    articles.map((article) => {
      return (
        <div key={article.id} className="col-lg-4 col-md-6 mb-5 gx-5">
          <div className="card shadow border-0 h-100">
            <div className="card-img-top">
              <img
                src={`${fileUrl}/uploads/articles/small/${article.image}`}
                className="w-100"
                alt="Articles & Blogs Image"
              />
            </div>
            <div className="card-body py-4">
              <div className="pb-1">
                <a href="" className="blog-title">
                  {article.title}
                </a>
              </div>

              <a
                href="#"
                className="btn btn-primary blog-readmore-btn mt-3 small-btn"
              >
                Read More
              </a>
            </div>
          </div>
        </div>
      );
    })}
</div>;
