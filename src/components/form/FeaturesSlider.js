import React from 'react';
import Slider from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/core/styles';

const CustomSlider = withStyles({
    root: {
      width: '100%',
      height: '1.75em',
      padding: 0
    },
    thumb: {
      height: 0,
      width: 0,
      '&:focus, &:hover, &$active': {
        boxShadow: 'inherit',
      }
    },
    active: {},
    track: {
      height: '1.75em',
      borderRadius: 100,
    },
    rail: {
      height: '1.75em',
      borderRadius: 100,
    },
  })(Slider);

class FeaturesSlider extends React.Component {
constructor() {
    super();
    this.state = {
        value : [0,100]
    }
    this.handleChange = this.handleChange.bind(this);
}

handleChange(event, newValue) {
    this.setState({ value : newValue }, () => {
        this.props.getValues([this.props.name, this.state.value]);
    });
    event.preventDefault();
}

  render() {
    const name = this.props.name;
    try {
        return (
            <div className={'slider'} id={'slider-'+name}>
                <div className='slider-name' id={'range-slider-'+name}>{name}</div>
                <CustomSlider
                    style={{ maxWidth: '80%', filter:'hue-rotate(80deg)' }}
                    value={this.state.value}
                    onChange={this.handleChange}
                    aria-labelledby={'range-slider-'+name}
                    step={1}
                    min={0}
                    max={100}
                />
            </div>
            )
    }
    catch(err) {
        return (
            <div> Something went wrong...</div>
        );
    }
  }
}

export default FeaturesSlider;
