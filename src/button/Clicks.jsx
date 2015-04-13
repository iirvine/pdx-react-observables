import React from 'react';

export default React.createClass({
  getInitialState() {
    return {lastClick: null};
  },

  componentWillMount() {
    this.subscription = this.props.stream
      .bufferWithCount(2)
      .filter(([a, b]) => a.secondsLeft > b.secondsLeft)
      .subscribe(([a, b]) => this.setState({lastClick: b}));
  },

  componentWillUnmount() {
    this.subscription.dispose();
  },

  getStyle(seconds) {
    if (seconds > 51) {
      return {color: '#820080'};
    }
    if (seconds > 41) {
      return {color: '#0083C7'};
    }
    if (seconds > 31) {
      return {color: '#02be01'};
    }
    if (seconds > 21) {
      return {color: '#E5D900'};
    }

    return {color: '#e50000'};
  },

  render() {
    let {lastClick} = this.state;
    if (!lastClick) { return null; }
    return (
      <div>
        Last click occurred with <span style={this.getStyle(lastClick.secondsLeft)}>{lastClick.secondsLeft}</span>
      </div>
    );
  }
});