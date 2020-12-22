import React from 'react';

class PlaylistCard extends React.Component {

  render() {
    return (
        <div id='playlist'>
            <img alt='playlist cover' src={this.props.image} /> 
            <div className='title'>{this.props.title}</div>
            <div className='desc'>Made with AuxNow <div id='dot'></div> {this.props.songLength} songs</div>
        </div>
    );
  }
}

export default PlaylistCard;
