import { func, node } from 'prop-types';
import React from 'react';

export const Cue = ({ children, callback }) => {
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
