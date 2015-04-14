import React from 'react';

export default React.createClass({
  getInitialState() {
    return {lastClick: null};
  },

  componentWillMount() {
    // second parameter to bufferWithCount is important - it's how many elements to 
    // skip between creation of consecutive buffers. the default is the count param 
    // since we want each tick buffer to overlap to compare them, we have to specify a skip of 1
    this.subscription = this.props.stream
      .bufferWithCount(2, 1)
      .filter(([a, b]) => b.secondsLeft >= a.secondsLeft)
      .subscribe(([a, b]) => this.setState({lastClick: a}));
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