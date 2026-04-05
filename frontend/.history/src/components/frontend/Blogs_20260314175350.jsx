import React from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Banner from '../common/Banner';
import BlogBanner from '../../assets/images/construction9.jpg';
import { apiUrl } from '../common/http';
import ArticleCard from '../common/ArticleCard'; // Reusable card component for each service

// SHOW ALL ARTICLES ON BLOGS PAGE.
const Blogs = () => {
  const [articles, setArticles] = React.useState([]);

  // Api call to fetch all articles.
  const fetchAllArticles = async () => {
    const res = await fetch(`${apiUrl}/get-articles`, {
      method: 'GET',
    });

    const result = await res.json();
    console.log(result);
    setArticles(result.data); // data is coming from backend api response index function of frontend/ArticlesController.
  };

  React.useEffect(() => {
    fetchAllArticles();
  }, []);

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

      <LatestArticles />

      <Footer />
    </>
  );
};

export default Blogs;
