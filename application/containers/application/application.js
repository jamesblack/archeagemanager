import React from 'react';

class Application extends React.Component {

  onClick() {
    console.log('lol');
  }

  render() {
    return (
      <div>
        <h1 onClick={this.onClick}>Application Controller</h1>
        {this.props.children}
      </div>
    );
  }

}

export default Application;
