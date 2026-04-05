import React from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Banner from '../common/Banner';
import BannerImg from '../../assets/images/banner2.jpg';

const ServiceDetail = () => {
  return (
    <>
      <Header />
      
      <Banner
        heading={'Shaping Tomorrows <br /> Structures Today'}
        text={
          'Our expert team blends innovation and craftsmanship to construct projects that stand the test of time, <br /> inspire progress, and reflect our unwavering commitment to quality and excellence.'
        }
        bgImage={BannerImg}
      />

      <Footer />
    </>
  );
};

export default ServiceDetail;
