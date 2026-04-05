import React from 'react';
import Banner from '../common/Banner';
import BannerImg from '../../assets/images/construction9.jpg';
import Header from '../common/Header';
import Footer from '../common/Footer';
import { apiUrl } from '../common/http';
import { useParams } from 'react-router-dom';
import { fileUrl } from '../common/http';

const BlogDetail = () => {
  const params = useParams();
  const [article, setArticle] = React.useState(null);

  const fetchArticle = async () => {
    const res = await fetch(`${apiUrl}/get-article/${params.id}`, {
      method: 'GET',
    });
    const result = await res.json();
    setArticle(result.data);
  };

  React.useEffect(() => {
    fetchArticle();
  }, []);

  return (
    <>
      <Header />
      <main>
        <Banner
          heading={
            'Projects That Define Us and Reflect <br /> Our Commitment to Excellence'
          }
          title={article?.title || ''}
          // text={''}
          bgImage={BannerImg}
        />

        <div className="container mx-auto">
          <div className="row">
            <div className="col-8">
              <h3>{article?.title}</h3>
              <div className="pb-3">
                by <strong>{article?.author}</strong> on {article?.created_at}
              </div>
            </div>
            <div className="pe-md-5 pb-3">
              <img
                src={`${fileUrl}/uploads/articles/large/${article?.image}`}
                alt={article?.title}
                className="mb-4 w-100 shadow border-0"
              />
              <div dangerouslySetInnerHTML={{ __html: article?.content }}></div>
            </div>
            <div className="col-4"></div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default BlogDetail;
