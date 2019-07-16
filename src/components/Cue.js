import React from 'react';

const Cue = ({ children, callback }) => {
  callback();
  return <span>{children}</span>;
};

export default Cue;
