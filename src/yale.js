'use strict';

const request = require('request-promise');

module.exports.arm = (username, password) => {
  console.log('Arming alarm');

  login(username, password)
    .then(cookieJar => setState(cookieJar, 'arm'))
    .then(cookieJar => logout(cookieJar));
};

module.exports.partArm = (username, password) => {
  console.log('Part-Arming alarm');

  login(username, password)
    .then(cookieJar => setState(cookieJar, 'home'))
    .then(cookieJar => logout(cookieJar));
};

module.exports.disarm = (username, password) => {
  console.log('Disarming alarm');

  login(username, password)
    .then(cookieJar => setState(cookieJar, 'disarm'))
    .then(cookieJar => logout(cookieJar));
};

function login(username, password) {
  console.log('Log in')
  let cookieJar = request.jar();

  return request({
    uri: 'https://www.yalehomesystem.co.uk/homeportal/api/login/check_login/',
    jar: cookieJar,
    method: 'POST',
    form: {
      id: username,
      password: password,
    },
    json: true
  }).then(response => {
    // Ensure login successful
    if (response.result != 1) {
      console.log('Login failed: ', response);
      throw 'Login failed';
    }

    return cookieJar;
  })
}

function logout(cookieJar) {
  console.log('Log out')
  return request({
    uri: 'https://www.yalehomesystem.co.uk/homeportal/api/logout',
    jar: cookieJar,
    method: 'POST',
  });
}

function setState(cookieJar, state) {
  console.log('Setting state to: ' + state)
  return request({
    uri: 'https://www.yalehomesystem.co.uk/homeportal/api/panel/set_panel_mode?area=1&mode=' + state,
    jar: cookieJar,
    method: 'POST',
  }).then(response => {
    return cookieJar;
  });
}
