// Require the libraries needed for application to run
var twitterKeys = require('./keys.js');
var Twitter = require('twitter');
var request = require('request');
var spotify = require('node-spotify-api');
var fs = require('fs');
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
  showTweets();
}
// ----------------------------------------------------
// If User uses 'spotify-this-song' command
else if (commandUsed.includes('spotify-this-song')) {
  var spotify = new spotify({
    id: '532f51e6f33a4fda80226df37c2f8f7e',
    secret: '88f87df049f7476583f1ce85770ecaa8'
  });
  spotifyThis();
}
// ----------------------------------------------------
// If User uses the 'movie-this' command
else if (commandUsed.includes('movie-this')) {
  movieThis();
}
// ----------------------------------------------------
// If User uses the 'do-what-it-says' command
else if (commandUsed.includes('do-what-it-says')) {
  fs.readFile('random.txt', 'utf-8', function(err, res) {
    if (err) {
      return console.log(err);
    }
    commandUsed.push(res);
    commandUsed = commandUsed.slice(1, commandUsed.length).join(',').split(',');
    spotifyThis();
    console.log(commandUsed);
  });
}
// ----------------------------------------------------
// FUNCTIONS
function showTweets() {
  var params = {
    screen_name: 'nodejs'
  };
  client.get('search/tweets', {
    q: 'yderek5'
  }, function(error, tweets, response) {
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

function spotifyThis() {
  var songTitle = commandUsed.slice(1, commandUsed.length);
  songTitle.join();

  if (commandUsed.length === 1) {
    songTitle = 'The Sign Ace of Base';
  }

  spotify.search({
    type: 'track',
    query: songTitle
  }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    console.log(data.tracks.items[0].artists[0].name);
    console.log(data.tracks.items[0].name);
    console.log(data.tracks.items[0].album.name);
    console.log(data.tracks.items[0].uri);
  });
}

function movieThis(movieTitle) {
  var apiKey = "&apikey=trilogy";
  var movieTitle;
  commandUsed = commandUsed.slice(1, commandUsed.length);
  if (commandUsed.length >= 2) {
    for (var i = 0; i < commandUsed.length; i++) {
      movieTitle = commandUsed[i++] + '+' + commandUsed[i];
    }
  } else if (commandUsed.length === 1) {
    movieTitle = commandUsed.join();
  } else {
    movieTitle = 'mr+nobody';
  }

  var chosenMovie = "?t=" + movieTitle;
  var movieLink = "http://www.omdbapi.com/" + chosenMovie + apiKey;

  request(movieLink, {
    json: true
  }, (err, res) => {
    if (err) {
      return console.log(err);
    }
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