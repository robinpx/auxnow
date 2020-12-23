/***
 * 
 * server.js
 * Edited example from Spotify auth-server with axios package 
 * https://github.com/spotify/web-api-auth-examples
 * 
 */

// Load packages 
var express = require('express');
var cors = require('cors');
var axios = require('axios');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');

var client_id = process.env.SPOTIFY_CLIENT_ID; 
var client_secret = process.env.SPOTIFY_CLIENT_SECRET; 
var redirect_uri = process.env.SPOTIFY_REDIRECT_URI || 'http://localhost:8888/callback';

var generateRandomString = function(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

var app = express();
var stateKey = 'spotify_auth_state';

app.use(express.static(__dirname + '/public'));
app.use(cookieParser());
app.use(cors());

// Request authorization
app.get('/login', function(req, res) {
   
    var state = generateRandomString(16);
    res.cookie(stateKey, state);

    // Refer to https://developer.spotify.com/documentation/general/guides/scopes/
    var scope = 'user-read-private user-library-read playlist-modify-private';

    // Redirect to authorization page with encoded querystring
    res.redirect('https://accounts.spotify.com/authorize?' + 
    querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri : redirect_uri,
        state: state
    }));
});

// Request access and refresh tokens
app.get('/callback', function(req, res) {
    var code = req.query.code || null;
    var state = req.query.state || null;
    var storedState = req.cookies ? req.cookies[stateKey] : null;
  
    if (state === null || state !== storedState) {
      res.redirect('/#' +
        querystring.stringify({
          error: 'state_mismatch'
        }));
    } else {
      res.clearCookie(stateKey);
      var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
          code: code,
          redirect_uri: redirect_uri,
          grant_type: 'authorization_code'
        },
        headers: {
          'Authorization': 'Basic ' + (Buffer.from(
              client_id + ':' + client_secret
            ).toString('base64')),
            Accept: 'application/json', 
            'Content-Type': 'application/x-www-form-urlencoded'
        }
      };
  
      axios.post(authOptions.url, querystring.stringify(authOptions.form), { headers : authOptions.headers })
      .then(function(response) {
        if (response.status === 200) {
          var access_token = response.data.access_token,
              expires_in = response.data.expires_in;
  
          var options = {
            headers: { 
                'Authorization': 'Bearer ' + access_token,
                'Content-Type':'application/json'
            }
          };
  
          // Use token to access API
          axios.get('https://api.spotify.com/v1/me', options)
          .then(function(response) {
            console.log(response.data);
          })
          .catch(function(error) {
            console.log(error);
          });
  
          // Pass token to browser
          var uri = process.env.FRONTEND_URI || 'http://localhost:3000'
          res.redirect(uri + '/#' +
            querystring.stringify({
              access_token: access_token,
              expires_in : expires_in
            }));
        } else {
          res.redirect('/#' +
            querystring.stringify({
              error: 'invalid_token'
            }));
        }
      })
      .catch(function(error) {
        console.log(error);
      });
    }
});

let port = process.env.PORT || 8888
console.log('Listening on port ' + port);
app.listen(port);