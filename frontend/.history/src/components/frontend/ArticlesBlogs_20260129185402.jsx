import Header from '../common/Header';
import Footer from '../common/Footer';
import Banner from '../common/Banner';
import BlogBanner from '../../assets/images/construction9.jpg';
import { default as ArticlesBlogs } from '../common/ArticlesBlogs';

const Blogs = () => {
  return (
    <>
      <Header />
      <main>
        <Banner
          heading={
            'Projects That Define Us and Reflect <br /> Our Commitment to Excellence'
          }
          text={
            'Each project we complete stands as a proud testament to our craftsmanship, <br /> technical expertise, and long-term vision for excellence.'
          }
          bgImage={BlogBanner}
        />
      </main>

      <ArticlesBlogs />
      <Footer />
    </>
  );
}

export default Blogs