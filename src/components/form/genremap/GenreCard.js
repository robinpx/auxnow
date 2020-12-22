import React from 'react';

class GenreCard extends React.Component {

  render() {
    let g = this.props.genre.toString().replaceAll(' ', '_');
    if (this.props.selected.indexOf(this.props.genre) > -1) {
      return (
          <div id={g} className='genre-card genre-on' onClick={this.props.behaviors.selected.bind(this,this.props.genre)}>
            <div className='genre' onMouseOver={this.props.behaviors.on.bind(this,this.props.genre)} 
            onMouseLeave={this.props.behaviors.off.bind(this)} >{this.props.genre}</div>
          </div>
      );
    }
    else {
      return (
        <div id={g} className='genre-card genre-off' onClick={this.props.behaviors.selected.bind(this,this.props.genre)}>
          <div className='genre' onMouseOver={this.props.behaviors.on.bind(this,this.props.genre)} 
          onMouseLeave={this.props.behaviors.off.bind(this)} >{this.props.genre}</div>
        </div>
      );
    }
  }
}

export default GenreCard;
