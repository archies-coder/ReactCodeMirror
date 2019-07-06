import React from 'react';
import PropTypes from 'prop-types';


const HELP_MSG = 'Select A Node To See Its Data Structure Here...';

const NodeViewer = ({node}) => {
  let json = JSON.stringify(node, null, 4);

  if (!json) {
    json = HELP_MSG;
  }

  return <div>{json}</div>;
};

NodeViewer.propTypes = {
  node: PropTypes.object
};

export default NodeViewer;
