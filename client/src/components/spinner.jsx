import React from 'react';

const Spinner = ({ size = 'default' }) => {
  const sizeClass =
    size === 'small' ? 'spinner-ring spinner-ring-sm' :
    size === 'large' ? 'spinner-ring spinner-ring-lg' :
    'spinner-ring';

  return (
    <div className="flex items-center justify-center" role="status" aria-label="Loading">
      <div className={sizeClass}></div>
    </div>
  );
};

export default Spinner;