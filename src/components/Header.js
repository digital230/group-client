import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {_} from 'underscore';
import moment from 'moment';
import autoBind from 'react-autobind';
import { Link, withRouter } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';

import {
  Avatar,
  Menu,
  MenuItem
} from 'material-ui';

import MyAvatar from './MyAvatar';
import jsStyles from '../stylesheets/StyleJs.js';
import helpers from '../utils/Helper';
import '../stylesheets/header.css';

class Header extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      openMenu: false,
      anchorEl: undefined,
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

  openMenu(e) {
    this.setState({
      openMenu: !this.state.openMenu,
      anchorEl: e.currentTarget
    });
  }

  handleClose() {
    this.setState({
      openMenu: false,
      anchorEl: undefined
    });
  }

  handleSeletcMenuItem(menuNumber) {
    const {history} = this.props;

    console.log(helpers.getCurrentUser())

    if (menuNumber === 2) {
      helpers.removeCookie();
      history.push('/login');

    }
  }

  render() {
    const {classes, currentUser} = this.props;
    const {openMenu, anchorEl} = this.state;

    let hasProfilePic = currentUser && currentUser.profile ? currentUser.profile.avatarUrl : undefined;


    return (
      <div className="header-container">
        <div className="header-leftside">
          <div className="logo">

          </div>
        </div>
        <div className="header-toolbar">
          <div className="login-avatar" onClick={(e) => this.openMenu(e)}>
            <MyAvatar
              image={hasProfilePic}
              name={currentUser.name}
              styles={classes}
            />

            <MyMenu
              open={openMenu}
              anchorEl={anchorEl}
              handleClose={this.handleClose}
              handleSeletcMenuItem={this.handleSeletcMenuItem}
              classes={classes}
            />
          </div>
        </div>
      </div>
    );
  }
}

Header.propTypes = {

};

const MyMenu = ({
  anchorEl,
  open,
  handleClose,
  handleSeletcMenuItem,
  classes,
}) => (
  <Menu
    anchorEl={anchorEl}
    open={open}
    onClose={() => handleClose()}
    classes={{paper: classes.menu}}
  >
    <MenuItem onClick={() => handleSeletcMenuItem(0)}>Profile</MenuItem>
    <MenuItem onClick={() => handleSeletcMenuItem(1)}>My account</MenuItem>
    <MenuItem onClick={() => handleSeletcMenuItem(2)}>Logout</MenuItem>
  </Menu>
);

export default withRouter(withStyles(jsStyles,{withTheme: true})(Header));
