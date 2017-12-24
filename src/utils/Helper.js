import Cookie from 'js-cookie';


const helpers = {};

helpers.setCookie = (user) => {
  Cookie.set('token', user);
  localStorage.setItem("token", user);
}

helpers.removeCookie = (user) => {
  Cookie.remove('token', user);
  localStorage.removeItem("token", user);
}


export default helpers;
