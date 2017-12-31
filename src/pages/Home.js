import React, {Component, PureComponent} from 'react';
import { Link, withRouter } from 'react-router-dom';
import { socketConnect } from 'socket.io-react';

import SubHeader from '../components/SubHeader';

class Home extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {}
  }


  render() {

    return (
      <div>
      <SubHeader />
      Home
      </div>
    );
  }
}

export default Home;
