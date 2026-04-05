import React from 'react';

const SkeletonLoader = ({
  bars = 3,
  height = '50px',
  width = '10px',
  gap = '10px',
}) => {
  return (
    <div
      className="d-flex justify-content-start align-items-end py-5"
      style={{ gap }}
    >
      {Array.from({ length: bars }).map((_, index) => (
        <div
          key={index}
          className="skeleton shimmer"
          style={{ width, height }}
        ></div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
