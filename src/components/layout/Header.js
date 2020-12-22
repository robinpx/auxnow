import React from 'react';

class Header extends React.Component {

  render() {
    return (
      <header>
          <b><a href='/'>AuxNow</a></b> 
          <div id='about-button' onClick={this.props.show}>About</div>
      </header>
    );
  }
}

export default Header;
