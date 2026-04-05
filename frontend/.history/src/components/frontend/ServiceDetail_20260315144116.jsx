import React from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Banner from '../common/Banner';
import BannerImg from '../../assets/images/banner2.jpg';

const ServiceDetail = () => {

  const params = useParams();
  
  const fetchService = async () => {
      const res = await fetch(`${apiUrl}/get-services/${params.id}`, {
        method: 'GET',
      });
      const result = await res.json();
      setServices(result.data); // "result.data" comes from frontend ServicesController, service method API response
    };
  
    // Fetch service when component mounts
    React.useEffect(() => {
      fetchService();
    }, []);
    
  return (
    <>
      <Header />

      <main>
        <Banner
          heading={'Shaping Tomorrows <br /> Structures Today'}
          text={
            'Our expert team blends innovation and craftsmanship to construct projects that stand the test of time, <br /> inspire progress, and reflect our unwavering commitment to quality and excellence.'
          }
          bgImage={BannerImg}
        />
      </main>
      <Footer />
    </>
  );
};

export default ServiceDetail;
