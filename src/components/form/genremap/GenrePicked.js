import React from 'react';

class GenrePicked extends React.Component {

  render() {
    const genrePick = this.props.chosenGenres;
    if (genrePick.length > 0) {
        return genrePick.map((genre, i) => {
            return (
                <div key={i} className='genre-pick'>{genre}</div>
            );
         });
    }
    else {
      return (
          <div className='genre-pick genre-nothing'>Nothing has been chosen</div>
      );
    }
  }
}

export default GenrePicked;
