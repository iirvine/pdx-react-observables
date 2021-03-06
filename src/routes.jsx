import React from 'react';
import {Route, DefaultRoute} from 'react-router';

import App from './App';
import TOC from './TOC';
import TheButton from './button';
import {CatFancy} from './cats';
import {ObservableCatFancy} from './cats';

const routes = (
  <Route path="/" handler={App}>
    <DefaultRoute handler={TOC} />
    <Route name="cat-fancy" path="cats" handler={CatFancy}/>
    <Route name="cat-fancy-observable" path="cats/observable" handler={ObservableCatFancy} />
    <Route name="thebutton" path="thebutton" handler={TheButton}/>
  </Route>
);

export default routes;