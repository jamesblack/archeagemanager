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
        <div className='container'>
          {this.props.children}
        </div>
      </div>
    );
  }

}

export default Application;
