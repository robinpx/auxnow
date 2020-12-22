import React from 'react';
import Button from './Button'

class Error extends React.Component {
  constructor() {
    super();
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('response');
    this.state = {
      type : myParam
    }
  }


  render() {
    return (
      <section id='error'>
        <div className='section-wrap'>
        <h2>{this.state.type}</h2>
        <p>Something went wrong!</p>
        <Button buttonName='Reload' action={() => {window.location.assign('./')}} />
        </div>
      </section>
    );
  }
}

export default Error;
