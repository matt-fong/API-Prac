import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginModal from '../LoginFormModal/LoginFormModal';
import SignUpModal from '../SignUpFormModal/SignUpFormModal';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;

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
          <img className='logo' src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/2560px-Airbnb_Logo_B%C3%A9lo.svg.png' />
          </NavLink>
        {isLoaded && sessionLinks}
      </div>
    </div>
  );
}

export default Navigation;
