import React from 'react';
import Banner from '../common/Banner';
import BannerImg from '../../assets/images/construction9.jpg';
import Header from '../common/Header';
import Footer from '../common/Footer';

const BlogDetail = () => {
  return (
    <>
      <Header />
      <main>
        <Banner
          heading={
            'Projects That Define Us and Reflect <br /> Our Commitment to Excellence'
          }
          // title={service?.title || ''}
          // text={''}
          bgImage={BannerImg}
        />
      </main>
      <Footer />
    </>
  );
};

export default BlogDetail;
