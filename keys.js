console.log('Keys are loaded');
console.log('---------------');

var twitterKeys = {
  consumer_key: process.env.twitter_consumer_key,
  consumer_secret: process.env.twitter_consumer_secret,
  access_token_key: process.env.twitter_access_key,
  access_token_secret: process.env.twitter_access_token_secret
};

module.exports = twitterKeys;
