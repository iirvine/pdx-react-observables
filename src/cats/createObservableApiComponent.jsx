import rx from 'rx';
import React from 'react';

export default function(Component) {
  return class extends React.Component {
    constructor() {
      super();
      
      this.state = {
        data: null
      };
    }

    componentWillMount() {
      this.subscription = this.props.stream
        .flatMap(this.props.api.query)
        .flatMap((response) => { return response.blob(); })
        .subscribe((data) => this.setState({data}));

      // initiate stream with a programmatic 'user event'
      this.props.onUserInput();
    }

    componentWillUnmount() {
      this.subscription.dispose();
    }

    render() {
      return (
        <Component {...this.props} {...this.state} />
      );
    }
  };
}