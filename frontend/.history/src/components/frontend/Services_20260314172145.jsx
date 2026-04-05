import React from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Banner from '../common/Banner';

import LatestServices from '../common/LatestServices'; 
import BannerImg from '../../assets/images/banner2.jpg';
import { apiUrl } from '../common/http';


// SHOW ALL SERVICES ON SERVICES PAGE.
const Services = () => { 
  const [services, setServices] = React.useState([]);

  // Api call to fetch all services.
  const fetchAllServices = async () => {
    const res = await fetch(`${apiUrl}/get-services`, {
      method: 'GET',
    });

    const result = await res.json();
    // console.log(result);
    setServices(result.data);    // data is coming from backend api response index function of frontend/ServicesController.
  };

  React.useEffect(() => {
    fetchAllServices();
  }, []);

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

      <LatestServices />

      <Footer />
    </>
  );
};

export default Services;
