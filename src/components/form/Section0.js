import React from 'react';
import ExtractButton from './extractor/ExtractButton';
import EndExtractButton from './extractor/EndExtractButton';
import ExtractDisplay from './extractor/ExtractDisplay';

class Section0 extends React.Component {
  constructor() {
    super();
    this.state = {
      intervalId : null,
      total: 0,
      likedSongs: [],
      extractBehavior : { isFinished : false, isDoing: false },
      scrapedData : {}
    }

    this.getExtractData = this.getExtractData.bind(this);
    this.sendExtractedData = this.sendExtractedData.bind(this);
  }

  getExtractData(data) {
    try {
      this.setState({ 
          intervalId : data.intervalId, 
          total : data.total, 
          likedSongs : data.likedSongs,
          extractBehavior : data.extractBehavior,
          scrapedData : data.scrapedData
         });
    }
    catch(err) {
      console.log(err);
    }
  }

  sendExtractedData() {
    this.props.getExtractedData(this.state.scrapedData, this.state.likedSongs.length);
  }


  render() {
    return (
      <section id='section0' className={this.props.sectionState} >
        <div className='section-wrap'>
        <ExtractDisplay total={this.state.total} extractBehavior={this.state.extractBehavior} />
        <div className='buttons'>
          <ExtractButton spotify={this.props.spotify} getExtractData={this.getExtractData} />
          <EndExtractButton intervalId={this.state.intervalId} extractBehavior={this.state.extractBehavior} sendExtractedData={this.sendExtractedData} />
        </div>
        </div>
      </section>
    );
  }
}

export default Section0;
