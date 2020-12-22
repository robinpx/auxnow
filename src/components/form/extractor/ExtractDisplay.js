import React from 'react';

class ExtractDisplay extends React.Component {
  constructor() {
    super();
    this.state = {
        intervalId : null,
        counter : 0,
        extractBehavior : { isFinished : false, isDoing: false },
        display : { 
            text: 'Fetch your Liked Songs',
            css : 'completed'
        }
    }
    this.counting = this.counting.bind(this);
    this.endCounting = this.endCounting.bind(this);
  }

  componentDidUpdate() {
      if (this.props.extractBehavior.isDoing && this.state.intervalId === null) {
          this.counting();
      }
      if (this.props.extractBehavior.isFinished && this.state.intervalId !== null) {
          this.endCounting();
      }
      if (this.props.extractBehavior.isFinished !== this.state.extractBehavior.isFinished ||
        this.props.extractBehavior.isDoing !== this.state.extractBehavior.isDoing) {
          this.setState({ extractBehavior : this.props.extractBehavior }, () => {
              this.setState({ 
                    display : { 
                        text: this.state.extractBehavior.isFinished ? 'Finishing...'
                        : this.state.extractBehavior.isDoing ? 'Fetching...'
                        : 'Fetch your Liked Songs',
                        css : this.state.extractBehavior.isFinished ? 'completed-active'
                        : this.state.extractBehavior.isDoing ? 'extracting-active'
                        : 'completed'
                    }
              });
          }); 
      }
  }

  counting() {
    let interval = setInterval(() => { 
        if (this.state.counter < this.props.total) {
            this.setState({ counter : this.state.counter + 1 }); 
        }
    }, 10);
    this.setState({ intervalId : interval });
  }

  endCounting() {
      clearInterval(this.state.intervalId);
  }


  render() {
    return (
        <React.Fragment>
        <div className={this.state.display.css}>{this.state.display.text}</div>
        <div className='big-num'><h2>{this.state.counter}</h2></div> 
        </React.Fragment>
    );
  }
}

export default ExtractDisplay;
