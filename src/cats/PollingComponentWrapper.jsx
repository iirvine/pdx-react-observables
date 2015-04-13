import React from 'react';

export default React.createClass({
  getInitialState() {
    return { count: 0, shouldUpdate: false };
  },

  componentWillMount() {
    this.interval = setInterval(this.update.bind(this), 1000);
  },

  componentWillUnmount() {
    clearInterval(this.interval);
  },

  update() {
    let next = this.state.timer + 1;
    this.setState({
      timer: next,
      shouldUpdate: next >= this.props.interval
    });
  },

  reset() {
    this.setState({timer: 0});
  },

  render() {
    return React.cloneElement(this.props.children, {
      shouldUpdate: this.state.shouldUpdate,
      reset: this.reset 
    });
  }
})