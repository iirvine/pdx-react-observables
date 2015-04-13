import React from 'react';
import CatFancy from './CatFancy';
import PollingComponentWrapper from './PollingComponentWrapper';
import ObservablePollingComponentWrapper from './ObservablePollingComponentWrapper';

import api from './api';
import createApiComponent from './createApiComponent';
import createObservableApiComponent from './createObservableApiComponent';

const ReactCatFancy = createApiComponent(CatFancy);
const ObservableCatFancy = createObservableApiComponent(CatFancy);

export default {
  CatFancy: React.createClass({
    render() {
      return (
        <PollingComponentWrapper interval={10}>
          <ReactCatFancy api={api} />
        </PollingComponentWrapper>
      );
    }
  }),
  
  ObservableCatFancy: React.createClass({
    render() {
      return (
        <ObservablePollingComponentWrapper interval={10000}>
          <ObservableCatFancy api={api}/>
        </ObservablePollingComponentWrapper>
      );
    }
  })
}