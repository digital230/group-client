import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {_} from 'underscore';
import moment from 'moment';
import autoBind from 'react-autobind';
import { Link, withRouter } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import queryString from 'query-string';
import jwt from 'jsonwebtoken';
import Cookie from 'js-cookie';
import helpers from '../utils/Helper.js';
import { FadeLoader } from 'halogenium';

import {
  Card,
  CardContent
} from 'material-ui';

import {
  Done
 } from 'material-ui-icons';

import stylesJs from '../stylesheets/StyleJs.js';
import  '../stylesheets/authorization.css';

class EmailVerified extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      resend: false,
      str: 'Please wait you account is being verified....',
    };

    this._isMounted = null;

    autoBind(this);
  }

  componentDidMount() {
    const {history} = this.props;
    this._isMounted = true;

    let token = queryString.parse(history.location.search).token;
    if (!token) {
      history.push('/register');
    }

    let decryptToken = jwt.verify(token, '6A586E327235753878214125442A472D');

    fetch(`http://${process.env.REACT_APP_SOCKET_URL}/emailVerification`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(decryptToken)
    })
    .then(result => result.json())
    .then(({error, data}) => {
      if (error) {
        // history.push('/register');
        console.log(data)
      } else {
        if (data.verified === true) {
          setTimeout(() => {
            this.setState({str: 'redirecting', loading: false})
          }, 3000)
          setTimeout(() => {
            history.push('/login');
          }, 4000)
        } else {
          this.setState({loading: false, resend: true})
        }
      }
    })
    .catch(err => console.log(err))


  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentWillReceiveProps(props) {

  }

  render() {
    const {classes} = this.props;
    const {loading, resend, str} = this.state;

    return (
      <div className="container">
        <div className="card-loader">
          <Card className={classes.card}>
            <CardContent>
              <div className="loader-main">
                <div className="loader">
                {loading ?
                  <FadeLoader color="#26A65B" size="16px" margin="4px"/>
                  :
                  <Done className={classes.iconDone}/>
                }
                </div>
                <div className="loading-text">
                  <p>{str}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}

EmailVerified.propTypes = {

};

export default withRouter(withStyles(stylesJs, {withTheme: true})(EmailVerified));
