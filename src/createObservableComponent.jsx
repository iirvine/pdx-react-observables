import rx from 'rx';
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

    componentWillMount() {
      this.inputStream = new rx.Subject();
      this.pauser = new rx.Subject();
      this.subscription = this.inputStream
        .flatMapLatest(() => this.props.timer
          .pausable(this.pauser)
          .startWith(-1))
        .subscribe(this.runQuery.bind(this));

      this.inputStream.onNext();
      this.pauser.onNext(true);
    }

    componentWillUnmount() {
      this.subscription.dispose();
    }

    runQuery() {
      console.log('running query');
      
      return this.props.api.query()
        .then((response) => response.blob())
        .then((data) => this.setState({data}));
    }

    pause() {
      this.pauser.onNext(false);
    }

    resume() {
      this.pauser.onNext(true);
    }

    render() {
      return (
        <Component {...this.props} {...this.state} 
          onUserInput={this.inputStream.onNext.bind(this.inputStream)}
          pause={this.pause.bind(this)}
          resume={this.resume.bind(this)} />
      );
    }
  };
}