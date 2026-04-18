import Header from '../common/Header';
import Footer from '../common/Footer';
import { default as AboutNew } from '../common/About';
import Banner from '../common/Banner';
import WhyChooseUs from '../common/WhyChooseUs';
import Team from '../common/Team';

const About = () => {
  return (
    <>
      <Header />
      <main style={{ marginTop: '80px' }}>
        <Banner
          preHeading={'About Us'}
          heading={'Building excellence, <br /> shaping the future'}
          text={
            'Our passion lies in designing and delivering enduring structures that blend innovation, precision, and integrity.<br />Every project reflects our promise to create value that stands the test of time.'
          }
        />

        <AboutNew />

        {/* Our Team */}

        <Team />

        <WhyChooseUs />
        
      </main>

      <Footer />
    </>
  );
};
export default About;
