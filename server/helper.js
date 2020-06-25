const Axios = require('axios')
const crypto =require('crypto');
const {APIKey, APISecretKey,accessToken,accessTokenSecret}=require('./keys');
const OAuth = require('OAuth');

module.exports.BASE_URL = 'https://api.twitter.com/1.1/'
module.exports.SEARCH_TWEETS_URL = `search/tweets.json?q={search}`;
module.exports.SEARCH_USER_URL = `users/search.json?q={search}`;

module.exports.call = async ( baseURL, url, callback )=>{

  var oauth = new OAuth.OAuth(
    'https://api.twitter.com/oauth/request_token',
    'https://api.twitter.com/oauth/access_token',
    APIKey,
    APISecretKey,
    '1.0A',
    null,
    'HMAC-SHA1'
  );

  return oauth.get(
    baseURL+url,
    accessToken,
    accessTokenSecret,
    function (error, data, response){
      callback(error, data, response);
  });
}

