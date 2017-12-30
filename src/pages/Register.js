import React, {PureComponent} from 'react';
import Random from '@mobylogix/node-random';
import PropTypes from 'prop-types';
import {_} from 'underscore';
import moment from 'moment';
import autoBind from 'react-autobind';
import { Link, withRouter } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import {
  TextField,
  Button,
} from 'material-ui';
import 'whatwg-fetch';

import helpers from '../utils/Helper';
import '../stylesheets/authorization.css';
import stylesJs from '../stylesheets/StyleJs.js';

class Register extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      alreadyPresent: false,
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

  register() {
    const {name, email, password} = this.state;

    if (email === '' || name === '' || password === '') {
      return;
    }

    let data = {
      _id: Random.id(),
      name,
      email,
      password,
    };

    fetch('http://localhost:3002/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(result => result.json())
    .then((res) => {
      if (res && res.alreadyPresent === true) {
        this.setState({alreadyPresent: true})
        this.resetState();
      } else {
        this.setState({emailSent: true, alreadyPresent: false})
        this.resetState();
      }
    })
    .catch(err => console.log(err))
  }

  resetState(){
    this.setState({
      name: '',
      email: '',
      password: '',
    });
  }

  render() {
    const {classes} = this.props;
    const {alreadyPresent, emailSent} = this.state;

    return (
      <div className="container">
        {emailSent &&
          <div className="email-sent">
            <p>An email sent to you please verify your email address!!</p>
          </div>
        }
        <div className="login-body">
          <TextField
            id="name"
            label="Name"
            value={this.state.name}
            onChange={(e) => this.setState({name: e.target.value})}
            margin="normal"
            className={classes.textField}
          />
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
            onClick={() => this.register() }
          >
            Submit
          </Button>

          {alreadyPresent &&
            <div className="not-found">
              <a href="/login">Accout is alreay present please login</a>
            </div>
          }
        </div>
      </div>
    );
  }
}

Register.propTypes = {

};

export default withRouter(withStyles(stylesJs, {withTheme: true})(Register));
