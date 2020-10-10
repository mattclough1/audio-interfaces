import React from 'react';
import { func, node } from 'prop-types';

const Cue = ({ children, callback }) => {
  callback();
  return <span>{children}</span>;
};

Cue.propTypes = {
  callback: func.isRequired,
  children: node,
};

Cue.defaultProps = {
  children: undefined,
};

export default Cue;
