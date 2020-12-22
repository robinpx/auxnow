import React from 'react';
import GenreCard from './GenreCard';

class GenreCards extends React.Component {
  
  render() {
    const genreKeys = Object.keys(this.props.genres);
    if (genreKeys.length > 0) {
      return genreKeys.map((genre, i) => {
        return (
          <GenreCard key={genre+i} genre={genre} selected={this.props.selected} behaviors={this.props.behaviors} />
        );
      });
    }
    else {
      return (
        <div className='genre-card'>
          <div className='genre genre-nothing'>There is nothing here...</div>
        </div>
      );
    }
  }
}

export default GenreCards;
