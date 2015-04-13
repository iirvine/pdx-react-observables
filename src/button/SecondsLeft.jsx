import React from 'react';

export default React.createClass({
  getInitialState() {
    return {secondsLeft: 60};
  },

  componentWillMount() {
    this.subscription = this.props.stream
      .subscribe((data) => this.setState({secondsLeft: data.secondsLeft}));
  },

  componentWillUnmount() {
    this.subscription.dispose();
  },

  render() {
    return (
      <div>
        Seconds Left: {this.state.secondsLeft}
      </div>
    );
  }
});