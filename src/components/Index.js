import React from 'react';
import Form from './layout/Form';
import Login from './layout/Login';

class Index extends React.Component {

  render() {
    if (!this.props.loggedIn) {
          return (
            <Login />
          );
    } 
    else {
      return (
        <Form 
        spotify={this.props.spotify}
        userId={this.props.userId} />
      );
    }
  }
}

export default Index;
