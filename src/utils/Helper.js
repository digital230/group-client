import Cookie from 'js-cookie';
import jwt from 'jsonwebtoken';

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


export default helpers;
