import React from 'react';

const SkeletonLoader = ({ lines = 3, width = '20px', height = '80px' }) => {
  return (
    <div className="d-flex gap-2 py-4">
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className="skeleton shimmer"
          style={{ width, height }} // Now uses height for vertical look
        ></div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
