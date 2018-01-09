import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {_} from 'underscore';
import moment from 'moment';
import autoBind from 'react-autobind';
import { Link, withRouter } from 'react-router-dom';
import { socketConnect } from 'socket.io-react';
import { withStyles } from 'material-ui/styles';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui';

import JsStyles from '../../../stylesheets/StyleJs';
import './new.css';

class New extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      open : props && props.open ? props.open : false,
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
      this.setState({open: props.open});
    }
  }

  handleModal = () => {
    this.props.handleModal();
  }

  render() {
    const {classes} = this.props;
    const {open} = this.state;

    return (
      <Dialog
        open={open}
        onClose={this.handleModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="new-form-main">


        </div>
      </Dialog>
    );
  }
}

New.propTypes = {

};

export default withStyles(JsStyles,{withTheme: true})(New);
