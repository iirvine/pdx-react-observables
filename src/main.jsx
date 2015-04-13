import React from 'react';
import Router from 'react-router';
import * as _fetch from 'whatwg-fetch';
import routes from './routes';

window.React = React;

Router.run(routes, Router.HistoryLocation, (Handler) => {
  React.render(
    <Handler />,
    document.getElementById('app')
  );
});