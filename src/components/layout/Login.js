import React from 'react';
import Button from '../Button';

class Login extends React.Component {

  render() {
    return (
        <section id='login'>
          <div id='login-content'>
          <div className='desc'>Create quick Spotify playlists based off your Liked Songs for your own ears and others.</div>
          <Button buttonName='Login with Spotify' action={() => {window.location.assign('https://auxnow-server.herokuapp.com/login')}} />
          </div>
          <div id='waves'></div>
        </section>
    );
  }
}

export default Login;
