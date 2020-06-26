const OAuth = require("oauth");

module.exports.BASE_URL = "https://api.twitter.com/1.1/";
module.exports.SEARCH_TWEETS_URL = `search/tweets.json?q={search}`;
module.exports.SEARCH_USER_URL = `users/search.json?q={search}`;
module.exports.STATUS_USER_URL = `statuses/user_timeline.json?user_id={id}`;

module.exports.call = async (baseURL, url, callback) => {
  const AKey = process.env.APIKey;
  const ASKey = process.env.APISecretKey;
  const aT = process.env.accessToken;
  const aTS = process.env.accessTokenSecret;
  var oauth = new OAuth.OAuth(
    "https://api.twitter.com/oauth/request_token",
    "https://api.twitter.com/oauth/access_token",
    AKey,
    ASKey,
    "1.0A",
    null,
    "HMAC-SHA1"
  );

  return oauth.get(baseURL + url, aT, aTS, function (error, data, response) {
    callback(error, data, response);
  });
};
