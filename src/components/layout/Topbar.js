import React from 'react';
import About from './About';
import Header from './Header';

class Topbar extends React.Component {
  constructor() {
    super();
    this.state = {
        aboutState : 'hide-about'
    }
    this.closeAbout = this.closeAbout.bind(this);
    this.showAbout = this.showAbout.bind(this);
  }

  closeAbout() {
    console.log('close');
    this.setState({ aboutState : 'hide-about' });
  }

  showAbout() {
    console.log('show');
    this.setState({ aboutState : 'show-about' });
  }

  render() {
    return (
      <React.Fragment>
      <About aboutState={this.state.aboutState} close={this.closeAbout}/>
      <Header show={this.showAbout} />
      </React.Fragment>
    );
  }
}

export default Topbar;
