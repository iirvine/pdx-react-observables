import React from 'react';
import moment from 'moment';
import {Observable} from 'rx';
import {DOM as rxDom} from 'rx-dom';
import SecondsLeft from './SecondsLeft';
import Clicks from './Clicks';

const Participants = React.createClass({
  render() {
    return (
      <div>
        Participants: {this.props.participants}
      </div>
    );
  }
});

export default React.createClass({
  getInitialState() {
    return {participants: 0};
  },

  componentWillMount() {
    this.stream = Observable.fromPromise(
      fetch('//cors-unblocker.herokuapp.com/get?url=https%3A%2F%2Fwww.reddit.com%2Fr%2Fthebutton')
        .then((response) => response.text()))
      .map((body) => {
        let regex = /"(wss:\/\/wss\.redditmedia\.com\/thebutton\?h=[^"]*)"/g;
        return regex.exec(body)[1];
      })
      .flatMap((url) => rxDom.fromWebSocket(url))
      .map((event) => JSON.parse(event.data))
      .filter((data) => data.type === 'ticking')
      .map(({payload}) => {
        return {
          now: moment(payload.now_str + ' 0000', 'YYYY-MM-DD-HH-mm-ss Z'),
          participants: parseInt(payload.participants_text.replace(/[^0-9]/g, '')),
          secondsLeft: payload.seconds_left
        };
      });

    this.subscription = this.stream
      .map(({participants}) => participants)
      .distinctUntilChanged()
      .subscribe((participants) => this.setState({participants}));
  },

  componentWillUnmount() {
    this.subscription.dispose();
  },

  render() {
    return (
      <div>
        <SecondsLeft stream={this.stream}/>
        <Clicks stream={this.stream}/>
        <Participants participants={this.state.participants}/>
      </div>
    );
  }
})