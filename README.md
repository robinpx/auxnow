# auxnow
**AuxNow** is a full stack web application built with React and Node that generates Spotify playlists based off your Liked Songs and your chosen genres, mood, and sound textures. Made to quickly create background music to aux, share with friends, or for personal use.<br />
This web app was made to familiarize myself React, backend development, and deployment.

#### [Live Demo](https://auxnow.herokuapp.com/)

## Built With
* [React](https://reactjs.org/docs/getting-started.html)
* [spotify-web-api-js](https://jmperezperez.com/spotify-web-api-js/)
* [Spotify API](https://developer.spotify.com/)
* [axios](https://www.npmjs.com/package/axios)
* See other dependencies in ```package.json```

## Getting Started
### Installation
``` 
git clone https://github.com/robinpx/auxnow.git
```
1. Get your own credentials from [Spotify](https://developer.spotify.com/)
2. Add `.env` file to ```auth-server``` folder and paste the fields<br />
``` 
SPOTIFY_CLIENT_ID=abc123
SPOTIFY_CLIENT_SECRET=def456
SPOTIFY_REDIRECT_URI=https://localhost:8888/callback
FRONTEND_URI=https://localhost:3000
```
3. Install node modules<br />
```
npm install
cd auth-server
npm install
```
### Usage
1. Run frontend React application on development server<br />
```
npm run dev
```
2. Run backend server<br />
```
cd auth-server
node server.js
```

## Demo
![example1](https://raw.githubusercontent.com/robinpx/robinpx.github.io/main/public/images/code/auxnow.gif?token=AF4URYFLRG2PE7OE3GIG4Z275PI7U)


## Acknowledgements
* [web-api-auth-examples](https://github.com/spotify/web-api-auth-examples)