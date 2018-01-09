import React, {Component, PureComponent} from 'react';
import { Link, withRouter } from 'react-router-dom';
import { socketConnect } from 'socket.io-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import helpers from '../utils/Helper';
import Loading from '../components/Loading';
import MyDrawer from '../components/drawer/Drawer';
import '../stylesheets/App.css';

class Layout extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: undefined,
      drawer: false,
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

  handleDrawer = (state) => {
    this.setState({drawer: state})
  }


  render() {
    const {children, socket} = this.props;
    const {currentUser, drawer} = this.state;

    const component  = React.cloneElement(children, {
      currentUser,
      socket,
    });

    if (!currentUser) {
      return <Loading text={'Loading your information'}/>
    }

    return (
      <div className="main-layout-container">
        <Header
          currentUser={currentUser}
          handleDrawer={this.handleDrawer}
          drawer={drawer}
        />
        <div className="main-body">
          <div className="drawer">
            <MyDrawer
              open={drawer}
              handleDrawer={this.handleDrawer}
            />
          </div>
          <div className="body-content">
            {component}
          </div>
        </div>
        <div className="main-footer">
          <Footer />
        </div>
      </div>
    );
  }
}

export default socketConnect(withRouter(Layout));
