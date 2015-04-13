import React from 'react';
import {Link} from 'react-router';

export default React.createClass({
  render() {
    return (
      <div>
        <ul>
          <li>
            <Link to='cat-fancy'>Cat Fancy</Link>
          </li>
          <li>
            <Link to='cat-fancy-observable'>Observable Cat Fancy</Link>
          </li>
          <li>
            <Link to="thebutton">The Button</Link>
          </li>
        </ul>
      </div>
    );
  }
});