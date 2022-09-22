import React from 'react';

const SpanYellow = ({ children }) => {
  const spanStyle = {
    color: '#ECB70A',
    fontFamily: 'Pacifico',
  };
  return <span style={spanStyle}>{children}</span>;
};

export default SpanYellow;
