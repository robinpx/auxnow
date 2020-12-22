import React from 'react';
import FeaturesSlider from './FeaturesSlider';

const attr = ['danceability','energy','instrumentalness','liveness','acousticness','speechiness'];

class Section4 extends React.Component {
  constructor() {
    super();
    this.getValues = this.getValues.bind(this);

    this.state = {
      finalSongs : [],
      0 : [0,100],
      1 : [0,100],
      2: [0,100],
      3: [0,100],
      4 : [0,100],
      5 : [0,100]
    }
  }

  componentDidUpdate() {
      if (this.state.finalSongs.length === 0 && this.props.objects.finalSongs !== undefined && this.props.objects.finalSongs !== this.state.finalSongs) {
        this.setState({ finalSongs : this.props.objects.finalSongs });
    }
  }

  getFinalSongs(slider) {
    if (this.props.objects.features[attr[0]] !== undefined) {
      let len = this.props.objects.features[attr[0]].length;
      let finalSongs = new Set();
      for (let j=0;j < len;j++) {
        let item = this.props.objects.features[attr[0]][j];
        finalSongs.add(item[1]);
      }
      finalSongs = new Set(finalSongs);
      
      let avgLower = 0;
      let avgUpper = 0;
      if (slider !== undefined) {
        for (let i=0; i < attr.length;i++) {
          let lowerBound = len * (slider[i][0]/100);
          let upperBound = len * (slider[i][1]/100);
          avgLower += lowerBound;
          avgUpper += upperBound;
        }
      }
      avgLower = Math.ceil(avgLower/attr.length);
      avgUpper = Math.ceil(avgUpper/attr.length);
      
      for (let i=0;i < attr.length;i++) {
        let newRange = this.props.objects.features[attr[i]].slice(avgLower,avgUpper);
        let intersect = new Set();
        for (let elem of newRange) {
          if (finalSongs.has(elem[1])) {
            intersect.add(elem[1]);
          }
        }
        finalSongs = intersect;
      }
      finalSongs = [...finalSongs];
      this.setState({ finalSongs : finalSongs });
    }
  }

  getValues(values) {
    if (values !== undefined) {
      let range = values[1]
      let ind = attr.indexOf(values[0]);
      if (ind === 0) {
        this.setState({ 0 : range });
      }
      else if (ind === 1) {
        this.setState({ 1 : range });
      }
      else if (ind === 2) {
        this.setState({ 2 : range });
      }
      else if (ind === 3) {
        this.setState({ 3 : range });
      }
      else if (ind === 4) {
        this.setState({ 4 : range });
      }
      else if (ind === 5) {
        this.setState({ 5 : range });
      }
    }
    let sliders = { 0: this.state[0], 1: this.state[1], 2: this.state[2], 3: this.state[3], 4: this.state[4], 5: this.state[5] };
    this.getFinalSongs(sliders);
  }

  render() {
      return (
          <section id='section4' className={this.props.sectionState} >
              <div className='section-wrap'>
                  <div id='sliders'>
                  {attr.map((name,i) => {
                    return (
                      <FeaturesSlider 
                      key={i} 
                      feature={this.props.objects.features[name]} 
                      name={name} 
                      getValues={this.getValues} />
                    );
                  })}
                  </div>
                  <div id='totalSongs'>{'There are ' + this.state.finalSongs.length + ' songs in your playlist'}</div>
                  <div className='button' onClick={() => {this.props.getPlaylist(this.state.finalSongs)}}>Finish</div>
            </div>
          </section>
      );
    
  }
}

export default Section4;
