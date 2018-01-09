import React, {Component, PureComponent} from 'react';
import { Link, withRouter } from 'react-router-dom';
import { socketConnect } from 'socket.io-react';

import SubHeader from '../components/SubHeader';
import New from './event/new/New';

class Home extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {}
  }


  render() {

    return (
      <div>
      <SubHeader>
        <New/>
      </SubHeader>
      Home
      </div>
    );
  }
}

export default Home;
