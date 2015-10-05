import React from 'react';

class Characters extends React.Component {

  onClick() {
    console.log('lol');
  }

  render() {
    return (
      <div>
        <h2 onClick={this.onClick}>Characters Controller</h2>
      </div>
    );
  }

}

export default Characters;
