import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTopOnRouteChange = () => {
  const location = useLocation();

  useEffect(() => {
    const from = location.state?.from;

    // Don't scroll if coming from sidebar
    if (from === 'sidebar') return;

    // Scroll to top for normal navigation
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
};

export default ScrollToTopOnRouteChange;
