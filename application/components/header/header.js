import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class Header extends React.Component {

  render() {
    return (
      <div className='navbar navbar-default'>
        <div className='container'>
          <div className='navbar-header'>
            <p className='navbar-brand'>Archage Manager</p>
          </div>
          <div className='collapse navbar-collapse'>
            <ul className='nav navbar-nav'>
              <li><Link activeClassName='active' to='/'>Home</Link></li>
              <li><Link activeClassName='active' to='/professions'>Professions</Link></li>
              <li><Link activeClassName='active' to='/characters'>Characters</Link></li>
            </ul>
            <ul className='nav navbar-nav navbar-right'>
              <li>{!this.props.user.email ? <a href='/login'>Login</a> : `Welcome back ${this.props.user.givenName}`}</li>
            </ul>
          </div>
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
