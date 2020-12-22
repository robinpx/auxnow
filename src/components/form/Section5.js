import React from 'react';
import Button from '../Button';
import PlaylistCard from './PlaylistCard';

class Section5 extends React.Component {

  render() {
    return (
        <section id='section5' className={this.props.sectionState}>
        <div className='section-wrap'>
          <PlaylistCard image={this.props.objects.playlistImage}  title={this.props.objects.nameOfPlaylist} songLength={this.props.objects.songLength} />
          <Button buttonName='Listen' action={() => {window.location.assign(this.props.objects.url)}} />
       </div>
       </section> 
    );
  }
}

export default Section5;
