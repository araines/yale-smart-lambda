'use strict';

const yale = require('./yale')

module.exports.arm = (event, context, callback) => {
  let credentials = JSON.parse(event.body)
  yale.arm(credentials.username, credentials.password)

  callback(null, {statusCode: 200});
};

module.exports.partArm = (event, context, callback) => {
  let credentials = JSON.parse(event.body)
  yale.partArm(credentials.username, credentials.password)

  callback(null, {statusCode: 200});
};

module.exports.disarm = (event, context, callback) => {
  let credentials = JSON.parse(event.body)
  yale.disarm(credentials.username, credentials.password)

  callback(null, {statusCode: 200});
};
