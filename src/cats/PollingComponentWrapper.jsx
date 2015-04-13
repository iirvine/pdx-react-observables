import React from 'react';
import rx from 'rx';

export default React.createClass({
  componentWillMount() {
    this.inputStream = new rx.Subject();
    
    this.stream = this.inputStream
      .flatMapLatest(() => rx.Observable
          .interval(this.props.interval)
          .startWith(-1));
  },

  onUserInput() {
    this.inputStream.onNext();
  },

  render() {
    return React.cloneElement(this.props.children, {
      stream: this.stream, 
      onUserInput: this.onUserInput});
  }
});