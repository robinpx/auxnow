import React from 'react';

class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value : ''
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ value : event.target.value });
        if (this.props.type === 1) {
            this.props.getChange(event.target.value);
        } 
    }

    render() {
      return (
        <form onSubmit={(e) => this.props.handleSubmit(e,this.state.value)}>
            <input type='text' value={this.state.value} onChange={this.handleChange} placeholder={this.props.placeholderText} />
        </form>
      );
    }
}

export default Input;
