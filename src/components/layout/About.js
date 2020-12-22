import React from 'react';

class About extends React.Component {

  render() {
    return (
        <div id='about' className={this.props.aboutState}> 
            <div id='about-wrap'>
              <p><b>AuxNow</b> is a web app that generates Spotify playlists based off your Liked Songs
              and your chosen genres, mood, and sound textures. </p>
              <p>Made to quickly create background music to aux, share with friends, or for personal use. </p>
              <p>Brought to you by <a href='https://github.com'>Robin</a> and Spotify API.</p>
              <div id='close-button' onClick={this.props.close}>⏎</div>
            </div>
          </div>
    );
  }
}

export default About;
