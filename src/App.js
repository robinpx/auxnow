import React from 'react';
import './App.css';
import Spotify from 'spotify-web-api-js';
import Topbar from './components/layout/Topbar';
import Index from './components/Index';
import Error from './components/Error';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const spotifyWebApi = new Spotify();

class App extends React.Component {

  constructor() {
    super();

    this.state = {
      loggedIn: false,
      username : '',
      userId : ''
    }
  }

  componentDidMount() {
    // checking cookie 
    if (typeof(document.cookie) === 'undefined' || !this.checkCookieTokens()) {
      const params = this.getHashParams();
      this.setState({ loggedIn : params.access_token ? true : false })
      if (params.access_token) {
        document.cookie='access_token='+params.access_token
        document.cookie='refresh_token='+params.refresh_token
        spotifyWebApi.setAccessToken(params.access_token);
        this.initialized();
      }
    }
    else {
      this.initializeWithCookie();
    }
    this.removeAccessTokenFromUrl();
  }

  initialized() {
    this.getUsername();
    console.log(spotifyWebApi);
  }

  initializeWithCookie() {
    if (this.checkCookieTokens()) {
      const access_token = this.getCookieToken();
      this.setState({ loggedIn : access_token ? true : false });
      spotifyWebApi.setAccessToken(access_token);
      this.initialized();
    }
  }

  checkCookieTokens() {
    try {
      const access_token = this.getCookieToken();
      if (access_token.length > 0) {
        return true;
      }
      return false;
    } catch(err) {
      return false;
    }
  }

  getCookieToken() {
    try {
      if (typeof(document.cookie) !== 'undefined') {
        const access_token = document.cookie.split('; ').find(row => row.startsWith('access_token')).split('=')[1];
        return access_token;
      }
      return '';
    } catch(err) {
      this.clearCookie('refresh');
    }
  }

  clearCookie(err) {
    try {
      if (JSON.parse(err.response)['error']['status'] === 401) {
        console.log(JSON.parse(err.response)['error']['status'])
        document.cookie='access_token='
        document.cookie='refresh_token='
        // clear cookies
        let status = JSON.parse(err.response)['error']['status'];
        window.location.assign('./error?response=' + status);
      }
    } catch(error) {
      window.location.assign('./error?response=');
    } 
  }

  getHashParams() {
      var hashParams = {};
      var e, r = /([^&;=]+)=?([^&;]*)/g, q = window.location.hash.substring(1);
      // eslint-disable-next-line
      while (e = r.exec(q)) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
      }
      return hashParams;
  }

  removeAccessTokenFromUrl() {
    let { history, location } = window
    let { hash } = location
    if (hash && hash.indexOf('access_token') !== -1 && history && history.replaceState) {
      const cleanURL = location.toString().replace(hash, '');
      history.replaceState({}, '', cleanURL);
    }
  }

  getUsername() {
    spotifyWebApi.getMe()
      .then((response) => {
        this.setState({
            username : response['display_name'],
            userId : response['id']
        });
      }).catch(err => {
        this.clearCookie(err);
      });
  }


  render() {
    return (
      <Router>
        <div id='container'>
          <Topbar />
          <div id='content'>
             <Route exact path='/' 
             component={() => <Index loggedIn={this.state.loggedIn} 
              spotify={spotifyWebApi}
              userId = {this.state.userId}
             />} />
             <Route path='/error' component={Error} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
