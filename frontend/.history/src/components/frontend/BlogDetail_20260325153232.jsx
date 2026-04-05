import React from 'react';
import Banner from '../common/Banner';
import BannerImg from '../../assets/images/construction9.jpg';
import Header from '../common/Header';
import Footer from '../common/Footer';
import { apiUrl } from '../common/http';
import { useParams } from 'react-router-dom';

const BlogDetail = () => {
  const params = useParams();
  const [blog, setBlog] = React.useState([]);

  const fetchBlog = async () => {
    const res = await fetch(`${apiUrl}/get-article/${params.id}`, {
      method: 'GET',
    });
    const result = await res.json();
    setBlog(result.data);
  };

  React.useEffect(() => {
    fetchBlog();
  }, []);

  return (
    <>
      <Header />
      <main>
        <Banner
          heading={
            'Projects That Define Us and Reflect <br /> Our Commitment to Excellence'
          }
          title={blog?.title || ''}
          // text={''}
          bgImage={BannerImg}
        />

        <div className="container mx-auto">
          <div className="row">
            <div className="col-8">
              <h2>Building Today, Growing Tomorrow</h2>
              <div className= 'pb-3'>by Admin on 15 July 2023</div>
            </div>
            <div className='pe-md-5 pb-3'>
              <img src="" alt="" />
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
