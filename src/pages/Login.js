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

import helpers from '../utils/Helper.js';
//
import '../stylesheets/authorization.css';
import stylesJs from '../stylesheets/StyleJs.js';

class Login extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      emailSent: false,
      notFound: false,
    };

    this._isMounted = null;

    autoBind(this);
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillMount() {
    const {history} = this.props;

    if (helpers.alreadyLogedIn()) {
      history.push('/');
    }
  }

  componentWillUnmount() {

    this._isMounted = false;

  }

  componentWillReceiveProps(props) {

  }




  login() {
    const {history} = this.props;
    const {email, password} = this.state;

    if (email === '' || password === '') {
      return;
    }

    fetch('http://localhost:3002/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    })
    .then(res => res.json())
    .then(({error, data, verified}) => {
      if (error) {
        history.push('/register')
      } else if (!error && verified === true) {
        history.push('/');
      } else if (!error && verified === false) {
        this.setState({emailSent: true, notFound: false});
      } else {
        this.setState({notFound: true, emailSent: false});
      }
    })
  }

  render() {
    const {classes} = this.props;
    const {emailSent, notFound} = this.state;

    return (
      <div className="container">
        {emailSent &&
          <div className="email-sent">
            <p>An email sent to you please verify your email address!!</p>
          </div>
        }
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
            onClick={() => this.login() }
          >
            Login
          </Button>

          {notFound &&
            <div className="not-found">
              <a href="/register">No User found please create account first</a>
            </div>
          }
        </div>
      </div>
    );
  }
}

Login.propTypes = {

};

export default socketConnect(withRouter(withStyles(stylesJs, { withTheme: true })(Login)))
