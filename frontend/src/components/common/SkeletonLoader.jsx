// function + props to create a skeleton loader with customizable bars, height, width, and gap
// if we dont pass any props in skeleton Loader component used in different pages then default values bars=3, height='30px', width='10px', gap='10px' will be used
const SkeletonLoader = ({   
  bars = 3,
  height = '30px',
  width = '10px',
  gap = '10px',
}) => {
  return (
    <div
      className="d-flex justify-content-center align-items-center py-5"
      style={{ gap }}
    >
      {/* Create an array of bars, in this case 3 undefined bars will be created because we have passed bars=3 and used _ which is a dummy variable 
      that stores any value, may be 1,2,3 or undefined. Here it creates empty slots  */}

      {/* index here is used to create a unique key {0,1,2} for each bar */}
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
