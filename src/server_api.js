/* Defines a set of functions that takes care of communication with ai.codes server.
 * Owned by the rendering process (app.js).
 */
import { config } from './simple_config';

const request = require('request');

const apiEndPoint = 'https://api.ai.codes/jvm/v3beta';
// const apiEndPoint = 'http://localhost:8088/jvm/v3beta';
// console.log(config);

function fetchMethodUsage(className, callback) {
  const option = {
    method: 'get',
    url: `${apiEndPoint}/class/${className}`,
    headers: {
      'User-Agent': 'Dashboard',
      authorization: `Bearer ${config.get('token')}`,
    },
  };
  request(option, (error, response, body) => {
    callback(JSON.parse(body));
  });
}

function fetchSimilarity(className, outerMethod, callback) {
  const option = {
    method: 'get',
    url: `${apiEndPoint}/class/${className}?c=${outerMethod}`,
    headers: {
      'User-Agent': 'Dashboard',
      authorization: `Bearer ${config.get('token')}`,
    },
  };
  request(option, (error, response, body) => {
    callback(JSON.parse(body));
  });
}

function fetchSnippets(query, callback, err) {
  const options = {
    method: 'get',
    url: `${apiEndPoint}/snippet?q=${query}`,
    headers: {
      'User-Agent': 'Dashboard',
      authorization: `Bearer ${config.get('token')}`,
    },
  };

  request.get(options, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      callback(JSON.parse(body).snippets);
    } else {
      err(error);
    }
  });
}

export {
    fetchMethodUsage,
    fetchSimilarity,
    fetchSnippets,
};
