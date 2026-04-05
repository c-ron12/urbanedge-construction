import React from 'react';
import Banner from '../common/Banner';

const BlogDetail = () => {
  return (
    <>
      <main>
        <Banner
          heading={
            'Projects That Define Us and Reflect <br /> Our Commitment to Excellence'
          }
          title={service?.title || ''}
          text={''}
          bgImage={BannerImg}
        />
      </main>
    </>
  );
};

export default BlogDetail;
