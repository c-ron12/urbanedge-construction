import React from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';

const ServiceDetail = () => {
  return (
    <>
      <Banner
        heading={'Shaping Tomorrows <br /> Structures Today'}
        text={
          'Our expert team blends innovation and craftsmanship to construct projects that stand the test of time, <br /> inspire progress, and reflect our unwavering commitment to quality and excellence.'
        }
        bgImage={BannerImg}
      />
      <Header />
      <Footer />
    </>
  );
};

export default ServiceDetail;
