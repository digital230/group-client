import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {_} from 'underscore';
import moment from 'moment';
import autoBind from 'react-autobind';
import { Link, withRouter } from 'react-router-dom';
import { socketConnect } from 'socket.io-react';
import {
  Drawer,
  withStyles
} from 'material-ui';

import Content from './Content';
import stylesJs from '../../stylesheets/StyleJs';
import './drawer.css';

class MyDrawer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      open: props && props.open ? props.open : false,

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
      this.setState({open: props.open})
    }

  }

  handleDrawer = () => {
    const {handleDrawer} = this.props;
    handleDrawer(!this.state.open)

  }

  render() {
    const {handleDrawer, classes} = this.props;
    const {open} = this.state;

    return (
      <Drawer
        open={open}
        onClose={this.handleDrawer}
        classes={{
          paper: classes.drawer
        }}
      >
        <Content />
      </Drawer>
    );
  }
}

MyDrawer.propTypes = {

};

export default withRouter(socketConnect(withStyles(stylesJs, {withTheme: true})(MyDrawer)));
