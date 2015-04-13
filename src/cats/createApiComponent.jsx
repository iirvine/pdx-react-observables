import React from 'react';
import api from './api';

export default function(Component) {
  return class extends React.Component {
    constructor() {
      super();
      
      this.state = {
        data: null
      };
    }

    componentDidMount() {
      this.runQuery();
    }

    runQuery() {
      this.props.reset();
      
      return this.props.api.query()
        .then((response) => response.blob())
        .then((data) => this.setState({data}));
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.shouldUpdate && !this.props.shouldUpdate) {
        this.runQuery();
      }
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