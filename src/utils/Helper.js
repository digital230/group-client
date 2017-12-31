import Cookie from 'js-cookie';
import jwt from 'jsonwebtoken';
import io from 'socket.io-client';

const helpers = {};

helpers.setCookie = (user) => {
  Cookie.set('token', user);
  localStorage.setItem("token", user);
}

helpers.removeCookie = (user) => {
  Cookie.remove('token', user);
  localStorage.removeItem("token", user);
}

helpers.alreadyLogedIn = () => {
  let token = Cookie.get('token') || localStorage.getItem('token');
  if (token)
    return true;
  return false;
}

helpers.getCurrentUser = () => {
  let userToken = Cookie.get('token') || localStorage.getItem('token');
  if (userToken)
    return jwt.verify(userToken, process.env.REACT_APP_SECRET);
  return undefined;
}

helpers.getToken = () => {
  return Cookie.get('token') || localStorage.getItem('token');
}

helpers.getSocket = () => {
  let userToken = Cookie.get('token') || localStorage.getItem('token');
  let socket = null;

  if (userToken) {
    socket = io(process.env.REACT_APP_SOCKET_URL, {
      token: userToken,
    });
  } else {
    socket = io(process.env.REACT_APP_SOCKET_URL);
  }

  return socket;
}


export default helpers;
