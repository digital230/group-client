import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {_} from 'underscore';
import moment from 'moment';
import autoBind from 'react-autobind';
import { Link, withRouter } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';

import {
  Avatar
} from 'material-ui';

import MyAvatar from './MyAvatar';
import jsStyles from '../stylesheets/StyleJs.js';
import '../stylesheets/header.css';

class Header extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {

    };

    this._isMounted = null;

    autoBind(this);
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentWillReceiveProps(props) {

  }

  render() {
    const {classes, currentUser} = this.props;

    let hasProfilePic = currentUser && currentUser.profile ? currentUser.profile.avatarUrl : undefined;


    return (
      <div className="header-container">
        <div className="header-leftside">
          <div className="logo">

          </div>
        </div>
        <div className="header-toolbar">
          <div className="login-avatar">
            <MyAvatar
              image={hasProfilePic}
              name={currentUser.name}
              styles={classes}
            />
          </div>
        </div>
      </div>
    );
  }
}

Header.propTypes = {

};

export default withRouter(withStyles(jsStyles,{withTheme: true})(Header));
