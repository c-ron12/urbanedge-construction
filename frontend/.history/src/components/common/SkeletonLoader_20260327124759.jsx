import React from 'react';

const SkeletonLoader = ({ lines = 3, width = '300px' }) => {
  return (
    <div className="d-flex flex-column align-items-center py-5">
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className="skeleton shimmer mb-3"
          style={{ width }}
        ></div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
