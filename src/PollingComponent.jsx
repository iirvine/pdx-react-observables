import React from 'react';
import api from './api';

export default React.createComponent({
  getInitialState() {
    return {
      x: 0,
      y: 0,
      data: [],
      timer: 0   
    };
  },

  componentDidMount() {
    this.interval = setInterval(this.update, 1000);
  },

  componentWillUnmount() {
    clearInterval(this.interval);
  },

  update() {
    this.setState({timer: this.state.timer + 1});
    if (this.state.timer >= 7) {
      api.query(this.state.x, this.state.y)
        .then((results) => this.setState({data: results.data}));
    }
  },

  onUserInput(x, y) {
    this.setState({
      x, 
      y,
      timer: 0
    });

    api.query(x, y)
      .then((results) => this.setState({data: results.data}));
  }
});