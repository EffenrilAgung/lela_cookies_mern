import React from 'react';

const SpanYellow = ({ className = '', children }) => {
  const spanStyle = {
    color: '#ECB70A',
    fontFamily: 'Pacifico',
  };
  return (
    <span style={spanStyle} className={className}>
      {children}
    </span>
  );
};

export default SpanYellow;
