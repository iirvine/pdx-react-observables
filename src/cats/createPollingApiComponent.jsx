import React from 'react';
import api from './api';

export default function(Component) {
  return class extends React.Component {
    constructor() {
      super();
      
      this.state = {
        data: null,
        timer: 0
      };
    }

    componentDidMount() {
      this.interval = setInterval(this.update.bind(this), 1000);
      this.runQuery();
    }

    componentWillUnmount() {
      clearInterval(this.interval);
    }

    runQuery() {
      this.setState({timer: 0});
      
      return this.props.api.query()
        .then((response) => response.blob())
        .then((data) => this.setState({data}));
    }

    update() {
      this.setState({timer: this.state.timer + 1}, () => {
        if (this.state.timer * 1000 >= this.props.interval) {
          this.runQuery();
        }
      });
    }

    onUserInput() {
      this.runQuery();
    }

    render() {
      return (
        <Component {...this.props} {...this.state} 
          onUserInput={this.onUserInput.bind(this)} />
      );
    }
  };
}