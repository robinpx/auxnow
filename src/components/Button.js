import React from 'react';

class Button extends React.Component {

  render() {
    return (
      <div className={'button '+this.props.state} onClick={this.props.action}>{this.props.buttonName}</div>
    );
  }
}

export default Button;
