// for the nodes/states 

import '../styles/state.css';
import React from 'react';
import PropTypes from 'prop-types';

const State = ({ name, isFinal }) => {
  return (
    <div className={`state ${isFinal ? 'final' : ''}`}>
      <span>{name}</span>
      {isFinal && <div className="inner-circle"></div>}
    </div>
  );
};

State.propTypes = {
  name: PropTypes.string.isRequired,
  isFinal: PropTypes.bool.isRequired,
};

export default State;