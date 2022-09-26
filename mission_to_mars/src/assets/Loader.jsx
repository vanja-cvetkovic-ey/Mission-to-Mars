import React from 'react';

import './Loader.scss';

const Loader = () => {
  return (
    <div className="Loader d-flex justify-content-center">
      <svg
        width="82"
        height="49"
        viewBox="0 0 82 49"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          id="e"
          d="M80.1911 0.5L63.5769 29.4383L63.5105 29.5539V29.6873V48.4745H49.9282V29.6873V29.5527L49.8606 29.4363L33.063 0.5H48.1773L56.3702 16.3029L56.8192 17.1689L57.2601 16.2987L65.2646 0.5H80.1911Z"
          stroke="#2E2E38"
        />
        <path
          id="y"
          d="M14.5823 29.1873H14.0823V29.6873V37.8182V38.3182H14.5823H38.5124V48.4745H0.5V0.5H27.3584L33.2298 10.8455H14.5823H14.0823V11.3455V19.4764V19.9764H14.5823H31.6947V29.1873H14.5823Z"
          stroke="#2E2E38"
        />
      </svg>
    </div>
  );
};

export default Loader;
