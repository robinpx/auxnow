import React from 'react';
import LimitSlider from './LimitSlider';
import Button from '../Button';

class Section2 extends React.Component {

  constructor() {
    super();
    this.state = {
      limit : 25,
      ifRecs : false,
      recDisplay: {option1: 'liked-on', option2: 'liked-off'}
    }
    this.getLimit = this.getLimit.bind(this);
  }

  getLimit(l) {
    this.setState({ limit : l });
  }

  componentDidUpdate() {
    if (this.state.ifRecs === true && this.state.recDisplay.option2 !== 'liked-on') {
      console.log(this.state.ifRecs)
      this.setState({ recDisplay : { option1: 'liked-off', option2: 'liked-on' } });
    }
    if (this.state.ifRecs === false && this.state.recDisplay.option1 !== 'liked-on') {
      console.log(this.state.ifRecs)
      this.setState({ recDisplay : { option1: 'liked-on', option2: 'liked-off' } });
    }
  }

  render() {
    return (
        <section id='section2' className={this.props.sectionState}>
            <div className='section-wrap'>
                <LimitSlider getLimit={this.getLimit} />
                <div id='options'>
                  <Button buttonName={'Pick only from my Liked Songs'} state={'top-button '+this.state.recDisplay.option1} 
                  action={() => {this.setState({ ifRecs : false })}} />
                  <Button buttonName={'Pick from my Liked Songs and similar songs'} state={'bottom-button '+this.state.recDisplay.option2} 
                  action={() => {this.setState({ ifRecs : true })}} />
                  <Button buttonName={'Next'} state={'next-button'} action={() => {this.props.getLimitRecData(this.state.ifRecs,this.state.limit)}} />
                </div>
              </div>
         </section>
    );
  }
}

export default Section2;
