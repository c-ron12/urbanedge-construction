
const SkeletonLoader = ({
  bars = 3,
  height = '30px',
  width = '10px',
  gap = '10px',
}) => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
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
