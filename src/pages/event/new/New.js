import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {_} from 'underscore';
import moment from 'moment';
import autoBind from 'react-autobind';
import { Link, withRouter } from 'react-router-dom';
import { socketConnect } from 'socket.io-react';
import { withStyles } from 'material-ui/styles';
import { DatePicker } from 'material-ui-pickers'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from 'material-ui';

import {
  KeyboardArrowLeft,
  KeyboardArrowRight
} from 'material-ui-icons';

import JsStyles from '../../../stylesheets/StyleJs';
import './new.css';

class New extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      open : props && props.open ? props.open : false,
      title: '',
      description: '',
      startDate: '',
      endDate: '',
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

  handleChange = (name, e) => {
    this.setState({[name]: e.target.value});
  }

  onClickDate = (name) => {
    this.setState({slotClicked: name}, ()=> {
      this.picker.wrapper.open();
    })
  }

  handleDateChange = (date) => {
    const {slotClicked} = this.state;

    if (slotClicked === 's-date') {
      this.setState({startDate: moment(date).format('D MMM')})
    } else {
      this.setState({endDate: moment(date).format('D MMM')})
    }

  }

  render() {
    const {classes} = this.props;
    const {open} = this.state;

    return (
      <Dialog
        open={open}
        onClose={this.handleModal}
        classes={{
          paper: classes.modal
        }}
      >
        <div className="new-form-main">
          <TextField
            id="title"
            label="Title"
            className={`${classes.textField} ${classes.marginBottom}`}
            value={this.state.title}
            onChange={(e) => this.handleChange('title', e)}
          />

          <TextField
            id="description"
            label="Description"
            className={`${classes.textField} ${classes.marginBottom}`}
            value={this.state.title}
            onChange={(e) => this.handleChange('description', e)}
          />

          <div className="form-dates">
            <TextField
              id="s-date"
              label="Start Date"
              className={`${classes.textFieldDate} ${classes.marginBottom}`}
              value={this.state.startDate}
              onClick={() => this.onClickDate('s-date')}
            />

            <TextField
              id="e-date"
              label="End Date"
              className={`${classes.textFieldDate} ${classes.marginBottom}`}
              value={this.state.endDate}
              onClick={() => this.onClickDate('e-date')}
            />
          </div>

        </div>

        <div className="hider">
          <DatePicker
            ref={(c) => {this.picker = c}}
            onChange={this.handleDateChange}
            autoOk
            minDate={moment()}
            leftArrowIcon={<KeyboardArrowLeft />}
            rightArrowIcon={<KeyboardArrowRight />}
          />
        </div>
      </Dialog>
    );
  }
}

New.propTypes = {

};

export default withStyles(JsStyles,{withTheme: true})(New);
