import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class Header extends React.Component {

  render() {
    console.log(this.props.user);
    return (
      <div className='header'>
        <div className='container'>
          <h1>Archeage Manager</h1>
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/professions'>Professions</Link></li>
            <li><Link to='/characters'>Characters</Link></li>
          </ul>
          <span>
            {!this.props.user.email ? <a href='/login'>Login</a> : `Welcome back ${this.props.user.givenName}`}
          </span>
        </div>
      </div>
    );
  }

}

export default connect(
  (state) => ({
    user: state.user,
  })
)(Header);
