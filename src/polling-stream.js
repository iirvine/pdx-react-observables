import {Observable} from 'rx';
import React from 'react';
import api from './api';

const timer = Observable.interval(7000);

export default function pollStream(input) {
  input.flatMapLatest(([x, y]) => {
    timer.startWith(-1).flatMap(api.query(x, y));
  });
}