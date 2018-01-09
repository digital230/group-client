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
  MenuItem,
  IconButton
} from 'material-ui';

import {
  Reorder
 } from 'material-ui-icons';

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
      drawerState: props && props.drawer ? props.drawer : false,
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
    if (props) {
      this.setState({drawerState: props.drawer});
    }
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

    if (menuNumber === 2) {
      helpers.removeCookie();
      history.push('/login');

    }
  }

  handleDrawer = () => {
    const {handleDrawer} = this.props;
    handleDrawer(!this.state.drawerState);
  }

  render() {
    const {classes, currentUser, handleDrawer} = this.props;
    const {openMenu, anchorEl, drawerState} = this.state;

    let hasProfilePic = currentUser && currentUser.profile ? currentUser.profile.avatarUrl : undefined;


    return (
      <div className="header-container">
        <div className="header-leftside">
          <IconButton
            onClick={this.handleDrawer}
          >
            <Reorder />
          </IconButton>
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
