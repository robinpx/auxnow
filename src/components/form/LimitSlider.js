import React from 'react';
import Slider from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/core/styles';

const CustomSlider = withStyles({
    root: {
      width: 'auto!important',
      height: '1em',
      marginLeft : '-1em'
    },
    thumb: {
      height: '1em',
      width: '1em',
      background: 'white',
      borderRadius: 100,
      marginTop: 1,
      '&:focus, &:hover, &$active': {
        boxShadow: 'inherit',
      }
    },
    active: {},
    track: {
      width: '1em',
      borderRadius: 100,
    },
    rail: {
      width: '1em',
      borderRadius: 100,
    },
    vertical: {
        '& $rail': {
          width: '1em'
        },
        '& $track': {
          width: '1em'
        },
        '& $thumb': {
          marginLeft: 1
        }
    }
  })(Slider);

class LimitSlider extends React.Component {
    constructor() {
        super();
        this.state = {
            value : 25
        }
        this.handleChange = this.handleChange.bind(this);
    }

handleChange(event, newValue) {
    this.setState({ value : newValue }, () => {
        this.props.getLimit(this.state.value);
    });
    event.preventDefault();
}

  render() {
    try {
        return (
            <div className={'slider'} id={'slider-limit'}>
                <div className='slider-name' id={'range-slider-limit'}>{this.state.value} song limit</div>
                <CustomSlider
                    orientation='vertical'
                    style={{ maxWidth: '100%' }}
                    value={this.state.value}
                    onChange={this.handleChange}
                    aria-labelledby={'range-slider-limit'}
                    step={1}
                    min={10}
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

export default LimitSlider;
