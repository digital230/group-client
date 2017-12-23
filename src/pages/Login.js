import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {_} from 'underscore';
import moment from 'moment';
import autoBind from 'react-autobind';
import { Link, withRouter } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import { socketConnect } from 'socket.io-react';
import {
  TextField,
  Button,
} from 'material-ui';
//
import '../stylesheets/authorization.css';
import stylesJs from '../stylesheets/StyleJs.js';

class Login extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
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

  login() {
    const {email, password} = this.state;

    if (email === '' || password === '') {
      return;
    }

    //login hete
  }

  render() {
    const {classes} = this.props;

    return (
      <div className="container">
        <div className="login-body">
          <TextField
            id="email"
            label="Email"
            value={this.state.email}
            onChange={(e) => this.setState({email: e.target.value})}
            margin="normal"
            className={classes.textField}
          />
          <TextField
            id="pass"
            label="Password"
            className={classes.textField}
            value={this.state.password}
            onChange={(e) => this.setState({password: e.target.value})}
            margin="normal"
          />

          <Button
            raised
            color="accent"
            onClick={() => this.login }
          >
            Login
          </Button>
        </div>
      </div>
    );
  }
}

Login.propTypes = {

};

export default socketConnect(withRouter(withStyles(stylesJs, { withTheme: true })(Login)))
