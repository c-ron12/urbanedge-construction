import React from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Banner from '../common/Banner';
import BannerImg from '../../assets/images/banner2.jpg';
import { apiUrl } from '../common/http';
import { useParams } from 'react-router-dom';


const ServiceDetail = () => {     // This component is for displaying the details of a specific service based on the ID from the URL parameters.

  const params = useParams();
  const [service, setService] = React.useState([]);

  const fetchService = async () => {
      const res = await fetch(`${apiUrl}/get-services/${params.id}`, {
        method: 'GET',
      });
      const result = await res.json();
      setService(result.data); // "result.data" comes from frontend ServicesController, service method API response
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
          title= {`${service.title}`}
          text={
            ''
          }
          bgImage={BannerImg}
        />
      </main>
      <Footer />
    </>
  );
};

export default ServiceDetail;
