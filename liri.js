// Require the libraries needed for application to run
var twitterKeys = require('./keys.js');
var Twitter = require('twitter');
var request = require('request');
var spotify = require('node-spotify-api');
// ----------------------------------------------------
// Get user input
var commandUsed = process.argv.slice(2, process.argv.length);
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
      // console.log(tweets); // <- logs all info on tweets
    }
  });
}
// ----------------------------------------------------
// If User uses 'spotify-this-song' command
else if (commandUsed.includes('spotify-this-song')) {

}
// ----------------------------------------------------
// If User uses the 'movie-this' command
else if (commandUsed.includes('movie-this')) {
  var apiKey = "&apikey=trilogy";
  var movieTitle;
  commandUsed = commandUsed.slice(1, commandUsed.length);
  if (commandUsed.length >= 2) {
    for (var i = 0; i < commandUsed.length; i++) {
      movieTitle = commandUsed[i++] + '+' + commandUsed[i];
    }
  } else if(commandUsed.length === 1) {
      movieTitle = commandUsed.join();
  } else {
    movieTitle = 'mr+nobody';
  }

  var chosenMovie = "?t=" + movieTitle;
  var movieLink = "http://www.omdbapi.com/" + chosenMovie + apiKey;

  request(movieLink, { json: true }, (err, res) => {
  if (err) { return console.log(err); }
    console.log('Movie Title: ' + res.body.Title);
    console.log('Year Movie Released ' + res.body.Year);
    console.log('IMDB Rating: ' + res.body.imdbRating);
    console.log('Rotten Tomatoes Rating: ' + res.body.Ratings[1].Value);
    console.log('Country Produced in: ' + res.body.Country);
    console.log('Language: ' + res.body.Language);
    console.log('Plot: ' + res.body.Plot);
    console.log('Actors/Actresses: ' + res.body.Actors);
  }); // end of request
}
// ----------------------------------------------------
// If User uses the 'do-what-it-says' command
  else if (commandUsed.includes('do-what-it-says')) {

  }
