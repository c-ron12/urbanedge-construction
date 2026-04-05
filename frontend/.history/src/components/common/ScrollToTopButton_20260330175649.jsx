import React from 'react';

const ScrollToTopButton = () => {
  const [visible, setVisible] = React.useState(false); // Show button when user scrolls down

  React.useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []); // Scroll to top when clicked

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // smooth scroll
    });
  };

  return (
    <>

      {visible && (
        <button
          onClick={scrollToTop}
          style={{
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            zIndex: 1000, // Changed: Use equal padding for a square base
            padding: '15px',
            borderRadius: '50%',
            border: 'none',
            backgroundColor: '#ffb703',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.3)', // Add: ensure perfect centering of the icon
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Changed: Replaced text arrow with the provided SVG */}
          
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 4L12 20M12 4L18 10M12 4L6 10"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          
        </button>
      )}
      
    </>
  );
};

export default ScrollToTopButton;
