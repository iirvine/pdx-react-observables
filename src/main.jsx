import React from 'react';
import api from './api';
import rx from 'rx';
import * as _fetch from 'whatwg-fetch';
import createPollingComponent from './createPollingComponent';
import createObservableComponent from './createObservableComponent';

window.React = React;

const INTERVAL = 10;

let CatFancy = React.createClass({
  getInitialState() {
    return {url: null, width: 0, height: 0, isPaused: false};
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.setState({url: URL.createObjectURL(nextProps.data)});
    }
  },

  componentDidMount() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    });
  },

  onPauseResumeClicked() {
    this.setState({isPaused: !this.state.isPaused});
    if (this.state.isPaused) {
      return this.props.resume();
    }

    this.props.pause();
  },

  render() {
    return (
      <div>
        <button onClick={this.props.onUserInput}>
          CAT!!
        </button>
        <button onClick={this.onPauseResumeClicked}>
          {this.state.isPaused ? 'RESUME' : 'PAUSE'}
        </button>
        <span>
          Cat countdown: {this.props.interval - this.props.timer}
        </span>
        <div>
          <img style={{width: this.state.width, height: this.state.height}} src={this.state.url} />
        </div>
      </div>
    );
  }
});

CatFancy = createObservableComponent(CatFancy);

React.render(
  <CatFancy api={api} timer={rx.Observable.interval(10000)} />,
  document.getElementById('app'));