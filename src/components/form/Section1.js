import React from 'react';
import Input from '../Input';

class Section1 extends React.Component {

  constructor() {
    super();
    this.state = {
      playlistName: '',
      display: 'hide'
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event, val) {
    if (val.length > 100 || val.length === 0) {
      this.setState({ display: 'show' });
    }
    else {
      this.setState({ display : 'hide', playlistName : val }, () => {
        this.props.getPlaylistName(this.state.playlistName);
      });
    }
    event.preventDefault();
  }

  render() {
    return (
        <section id='section1' className={this.props.sectionState}>
        <div className='section-wrap'>
            <Input type={0} placeholderText={'Name your playlist'} handleSubmit={this.handleSubmit} />
            <div className={'name-error '+this.state.display}>
              <div>Must be between 1-100 characters</div>
            </div>
       </div>
       </section> 
    );
  }
}

export default Section1;
