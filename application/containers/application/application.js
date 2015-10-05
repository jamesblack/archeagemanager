import React from 'react';
import { Header } from '../../components';

class Application extends React.Component {

  onClick() {
    console.log('lol');
  }

  render() {
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
    );
  }

}

export default Application;
