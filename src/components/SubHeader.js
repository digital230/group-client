import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {_} from 'underscore';
import moment from 'moment';
import autoBind from 'react-autobind';
import { Link, withRouter } from 'react-router-dom';
import { socketConnect } from 'socket.io-react';
import { withStyles } from 'material-ui/styles';

import {
  Button
} from 'material-ui';
import {

} from 'material-ui/SvgIcon';

import JsStyles from '../stylesheets/StyleJs.js';
import '../stylesheets/subHeader.css';

class SubHeader extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      newEventModal: false,
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

  handleModal = () => {
    const {newEventModal} = this.state;
    this.setState({newEventModal: !newEventModal});
  }

  render() {
    const {classes, children} = this.props;

    let newEvent = React.cloneElement(children, {
      open: this.state.newEventModal,
      handleModal: this.handleModal,
    })

    return (
      <div className="subHeader-container">
        <div className="left-side">
          <Button
            className={classes.button}
            raised
            onClick={this.handleModal}
          >
            New Event
          </Button>
        </div>
        <div className="right-side">

        </div>

        {newEvent}
      </div>
    );
  }
}

SubHeader.propTypes = {

};

export default withStyles(JsStyles,{withTheme: true})(SubHeader);
