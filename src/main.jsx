import React from 'react';
import PollingComponent from './PollingComponent';

window.React = React;

React.render(<PollingComponent/>,
  document.getElementById('app'));