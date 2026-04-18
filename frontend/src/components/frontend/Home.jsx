import Header from '../common/Header';
import Footer from '../common/Footer';
import About from '../common/About';
import LatestServices from '../common/LatestServices';
import LatestProjects from '../common/LatestProjects';
import LatestArticles from '../common/LatestArticles';
import LatestTestimonials from '../common/LatestTestimonials';
import WhyChooseUs from '../common/WhyChooseUs';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <Header />
      <main>
        <section className="section-1">
          <div className="banner d-flex align-items-center">
            <div className="container-fluid">
              <div className="text-center">
                <span>Welcome to Urban Edge Constructions</span>
                <h1>
                  Crafting dreams with <br />
                  precision and excellence.
                </h1>
                <p className="title-desc-text">
                  We excel at transforming visions into reality through
                  outstanding craftsmanship and precise attention to detail.
                  <br />
                  With years of experience and a dedication to quality.
                </p>
                <div className="mt-5 banner-btns">
                  <Link className="btn btn-primary large-btn" to="/contact">
                    Contact Now
                  </Link>
                  <Link
                    className="btn btn-primary ms-3 large-btn"
                    to="/projects"
                  >
                    View Projects
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <About titleOnly />

        <LatestServices /> {/*  SHOW LATEST SERVICE ON HOME PAGE */}

        <WhyChooseUs />

        <LatestProjects />

        <LatestTestimonials />

        <LatestArticles />
        
      </main>

      <Footer />
    </>
  );
};

export default Home;
