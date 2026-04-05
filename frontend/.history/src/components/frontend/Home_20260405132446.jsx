import Header from '../common/Header';
import Footer from '../common/Footer';
import About from '../common/About';
import LatestServices from '../common/LatestServices';
import LatestProjects from '../common/LatestProjects';
import LatestArticles from '../common/LatestArticles';
import LatestTestimonials from '../common/LatestTestimonials';
import WhyChooseUs from '../common/WhyChooseUs';
import SkeletonLoader from '../common/SkeletonLoader';

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
                <p className='title-desc-text'>
                  We excel at transforming visions into reality through
                  outstanding craftsmanship and precise attention to detail.
                  <br />
                  With years of experience and a dedication to quality.
                </p>
                <div className="mt-4">
                  <a className="btn btn-primary large-btn">Contact Now</a>
                  <a className="btn btn-secondary ms-3 large-btn">
                    View Projects
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <About titleOnly />

      <LatestServices /> {/*  SHOW LATEST SERVICE ON HOME PAGE */}

      <WhyChooseUs />

      <LatestProjects /> 

      <LatestTestimonials />

      <LatestArticles />

      <Footer />
    </>
  );
};

export default Home;
