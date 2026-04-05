import Header from '../common/Header';
import Footer from '../common/Footer';
import { default as AboutNew } from '../common/About';

import MemberImg from '../../assets/images/team1.jpg';
import Banner from '../common/Banner';
import WhyChooseUs from '../common/WhyChooseUs';
import Team from '../common/Team';


const About = () => {
  return (
    <>
      <Header />
      <main>
        <Banner
          preHeading={'About Us'}
          heading={'Building excellence, <br /> shaping the future'}
          text={
            'Our passion lies in designing and delivering enduring structures that blend innovation, precision, and integrity.<br />Every project reflects our promise to create value that stands the test of time.'
          }
        />
      </main>

      <AboutNew />

      {/* Our Team */}

      <Team />

      <WhyChooseUs />

      <Footer />
    </>
  );
};
export default About;
