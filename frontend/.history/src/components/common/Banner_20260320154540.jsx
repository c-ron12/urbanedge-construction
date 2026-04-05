import DefaultBanner from '../../assets/images/construction12121.jpg'; // default banner image.

const Banner = ({ heading, title, text, bgImage }) => {
  //  Use the passed bgImage OR fallback to the default one.
  const backgroundImage = bgImage || DefaultBanner;

  const bannerStyle = {
    background: `linear-gradient(to right, #000c, #0000), url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };

  return (
    <section className="section-7">
      {/* Apply style */}
      <div className="banner d-flex align-items-center" style={bannerStyle}>
        <div className="container-fluid">
          <div className="text-center">
            <h2 dangerouslySetInnerHTML={{ __html: heading }}></h2>
            <br />
        
            {title && <h3 dangerouslySetInnerHTML={{ __html: title }}></h3>}
            <p dangerouslySetInnerHTML={{ __html: text }}></p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
