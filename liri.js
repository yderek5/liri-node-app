// Variable that has all the twitter keys stored
var twitterKeys = require('./keys.js');
// ----------------------------------------------------
// Require the libraries needed for application to run
var Twitter = require('twitter');
var request = require('request');
var spotify = require('node-spotify-api');
// ----------------------------------------------------
// Get user input
var commandUsed = process.argv.slice(2, process.argv.length);
// console.log(commandUsed);
// ----------------------------------------------------
// If User uses 'my-tweets' command
if (commandUsed.includes('my-tweets')) {
  var client = new Twitter({
    consumer_key: twitterKeys.consumer_key,
    consumer_secret: twitterKeys.consumer_secret,
    access_token_key: twitterKeys.access_token_key,
    access_token_secret: twitterKeys.access_token_secret
  });
  var params = {
    screen_name: 'nodejs'
  };
  client.get('search/tweets', {q: 'yderek5'}, function(error, tweets, response) {
    if (!error) {
      console.log("Derek's tweets");
      console.log('------------------------');
      for (var i = 0; i < tweets.statuses.length; i++) {
        console.log(tweets.statuses[i].created_at);
        console.log(tweets.statuses[i].text);
        console.log('------------------------');
      }
      // console.log(tweets); <- logs all info on tweets
    }
  });
}
// ----------------------------------------------------
// If User uses 'spotify-this-song' command
else if (commandUsed.includes('spotify-this-song') && commandUsed.length === 2) {

}
// ----------------------------------------------------
