import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginModal from '../LoginFormModal/LoginFormModal';
import SignUpModal from '../SignUpFormModal/SignUpFormModal';
import './Navigation.css';
import logo from '../../assets/airdndlogo.jpg'

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;

  const history = useHistory();

  if (sessionUser) {
    sessionLinks = (
      <div className="user-session">
        <ProfileButton user={sessionUser} />
      </div>
    );
  } else {
    sessionLinks = (
      <div className="user-session">
        <LoginModal />
        <SignUpModal />
      </div>
    );
  }

  return (
    <div className='navContainer'>
      <div className='navBar'>
          <NavLink exact to="/">
          <img className='logo' src={logo} ></img>
          </NavLink>
          <div className='navBarLeftSide'>
            <div className='navBarButtons'>
              <div className='becomeAHost' onClick={() => history.push("/create-spot")}>Become a host</div>
              <div className='navBarLoaded'>{isLoaded && sessionLinks}</div>
            </div>
          </div>
      </div>
    </div>
  );
}

export default Navigation;
