import React from 'react';

class GenreTag extends React.Component {

  render() {
    try {
      if (this.props.artists.length > 0) {
        return this.props.artists.map((name, i) => {
          let n = 'genre-artist ' + name.replaceAll(' ', '_').toLowerCase();
          if (i < 10) {
              return (
                <span className={n} key={name+i}>
                  {name}
                </span>
              );
          }
          else {
            return (
              <React.Fragment></React.Fragment>
            )
          }
        });
      }
      else {
        return (
          <span className='empty-artists' key={'none'}>
            No Artists
          </span>
        );
      }
    }
    catch(err) {
      return (
        <span className='empty-artists' key={'none'}>
          No Artists
        </span>
      );
    }
  }
}

export default GenreTag;
