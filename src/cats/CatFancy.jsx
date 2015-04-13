import React from 'react';

export default React.createClass({
  getInitialState() {
    return {
      url: null, 
      width: 0, 
      height: 0, 
      timeSinceLastCat: 0
    };
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.setState({
        url: URL.createObjectURL(nextProps.data),
        timeSinceLastCat: 0
      });
    }
  },

  componentDidMount() {
    this.interval = setInterval(() => this.setState({
      timeSinceLastCat: this.state.timeSinceLastCat + 1
    }), 1000);
    
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    });
  },

  componentWillUnmount() {
    clearInterval(this.interval);
  },

  render() {
    return (
      <div>
        <button onClick={this.props.onUserInput}>
          CAT!!
        </button>
        <span>
          Time since last cat: {this.state.timeSinceLastCat}
        </span>
        <div>
          <img style={{width: this.state.width, height: this.state.height}} src={this.state.url} />
        </div>
      </div>
    );
  }
});