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
      console.log('running query');

      this.setState({timer: 0});
      
      return this.props.api.query()
        .then((response) => response.blob())
        .then((data) => this.setState({data}));
    }

    update() {
      console.log(this.state.timer);
      this.setState({timer: this.state.timer + 1}, () => {
        if (this.state.timer >= this.props.interval) {
          this.runQuery();
        }
      });
    }

    onUserInput() {
      this.runQuery();
    }

    pause() {
      clearInterval(this.interval);
    }

    resume() {
      this.interval = setInterval(this.update.bind(this), 1000);
    }

    render() {
      return (
        <Component {...this.props} {...this.state} 
          onUserInput={this.onUserInput.bind(this)}
          pause={this.pause.bind(this)}
          resume={this.resume.bind(this)} />
      );
    }
  };
}