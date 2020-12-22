import React from 'react';
import Button from '../../Button';

class EndExtractButton extends React.Component {
    constructor() {
        super();
        this.state = {
            isDoing : false,
            isFinished: false,
            display: 'hide'
        }

        this.stopExtract = this.stopExtract.bind(this);
    }

    stopExtract() {
        clearInterval(this.props.intervalId);
        this.setState({ isFinished : true }, () => {
            this.props.sendExtractedData();
        });
    }
    
    componentDidUpdate() {
        if (this.props.extractBehavior !== undefined) {
            if (this.state.isFinished !== this.props.extractBehavior.isFinished || 
                this.state.isDoing !== this.props.extractBehavior.isDoing) {
                this.setState({ isFinished : this.props.extractBehavior.isFinished, isDoing: this.props.extractBehavior.isDoing }, () => {
                    this.setState({ 
                        display : this.state.isDoing ? 'show' : 'hide'
                    });
                    if (this.state.isFinished) {
                        this.stopExtract();
                    }
                });
            }
        }
    }


    render() {
        return (
            <Button state={this.state.display} action={this.stopExtract} buttonName={'Stop'} />
        );
    }
}

export default EndExtractButton;
