import React, {Component, PureComponent} from 'react';
import { Link, withRouter } from 'react-router-dom';
import { socketConnect } from 'socket.io-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import helpers from '../utils/Helper';
import Loading from '../components/Loading';
import '../stylesheets/App.css';

class Layout extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: undefined,
    }
  }

  componentDidMount() {
    const {history, socket} = this.props;

    setTimeout(() => {
      this.setState({currentUser: helpers.getCurrentUser()}, () => {
        if (!this.state.currentUser) {
          history.push('/login');
        }
      });
    }, 1000)
  }


  render() {
    const {children} = this.props;
    const {currentUser} = this.state;

    const component  = React.cloneElement(children, {
      currentUser
    });

    if (!currentUser) {
      return <Loading text={'Loading your information'}/>
    }

    return (
      <div className="main-layout-container">
        <Header
          currentUser={currentUser}
        />
        <div className="main-body">
          {component}
        </div>
        <div className="main-footer">
          <Footer />
        </div>
      </div>
    );
  }
}

export default socketConnect(withRouter(Layout));
