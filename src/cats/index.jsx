import React from 'react';
import CatFancy from './CatFancy';
import PollingComponentWrapper from './PollingComponentWrapper';

import api from './api';
import createObservableApiComponent from './createObservableApiComponent';
import createPollingApiComponent from './createPollingApiComponent';

const ObservableCatFancy = createObservableApiComponent(CatFancy);
const PollingCatFancy = createPollingApiComponent(CatFancy);

export default {
  CatFancy: React.createClass({
    render() {
      return <PollingCatFancy api={api} interval={10000} />;
    }
  }),
  
  ObservableCatFancy: React.createClass({
    render() {
      return (
        <PollingComponentWrapper interval={10000}>
          <ObservableCatFancy api={api}/>
        </PollingComponentWrapper>
      );
    }
  })
}