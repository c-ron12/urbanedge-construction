import React from 'react';

const ScrollToTopButton = () => {
  const [visible, setVisible] = React.useState(false);

  // Show button when user scrolls down
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
  }, []);

  // Scroll to top when clicked
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
          onClick={BackToTopButton}
          style={{
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            zIndex: 1000,
            padding: '10px 15px',
            fontSize: '18px',
            borderRadius: '50%',
            border: 'none',
            backgroundColor: '#000',
            color: '#fff',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
          }}
        >
          ↑
        </button>
      )}
    </>
  );
};

export default ScrollToTopButton;
