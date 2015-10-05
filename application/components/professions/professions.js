import React from 'react';

class Professions extends React.Component {

  onClick() {
    console.log('lol');
  }

  render() {
    return (
      <div>
        <h2 onClick={this.onClick}>Professions Controller</h2>
      </div>
    );
  }

}

export default Professions;
