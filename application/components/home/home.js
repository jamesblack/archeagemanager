import React from 'react';

class Home extends React.Component {

  onClick() {
    console.log('lol');
  }

  render() {
    return (
      <div>
        <h2 onClick={this.onClick}>Home Controller</h2>
      </div>
    );
  }

}

export default Home;
