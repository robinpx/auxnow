import React from 'react';
import GenreCards from './GenreCards';
import GenreTag from './GenreTag';

class GenreMap extends React.Component {
  constructor()  {
    super();
    this.state = {
      artistTag: [],
      selectedGenres: []
    }
    this.onHover = this.onHover.bind(this);
    this.offHover = this.offHover.bind(this);
    this.selected = this.selected.bind(this);
  }


  onHover(genre) {
    this.setState({ artistTag : this.props.genres[genre] });
  }

  offHover() {
    this.setState({ artistTag : [] })
  }

  selected(genre) {
    if (this.state.selectedGenres.indexOf(genre) < 0) {
      this.setState({ selectedGenres : this.state.selectedGenres.concat(genre) }, () => {
        this.props.getSelectedGenres(this.state.selectedGenres);
      });
    }
    else {
      let index = this.state.selectedGenres.indexOf(genre);
      let newPicked = this.state.selectedGenres;
      newPicked.splice(index,1);
      this.setState({ selectedGenres : newPicked }, () => {
        this.props.getSelectedGenres(this.state.selectedGenres);
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        <div id='genre-map'>
          <GenreCards genres={this.props.genres} selected={this.state.selectedGenres} 
          behaviors={{ on : this.onHover, off : this.offHover, selected: this.selected }} />
        </div>
        <div id='artists'>
          <b>Artists</b>
          <GenreTag artists={this.state.artistTag} />
        </div>
      </React.Fragment>
    );
  }
}

export default GenreMap;
