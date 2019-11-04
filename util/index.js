const request = require('request');

function getResponse(requestOptions) {
  return new Promise((resolve, reject) => {
    request(requestOptions, (error, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
  });
}

exports.getResponse = getResponse;
