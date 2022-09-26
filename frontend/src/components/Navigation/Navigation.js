import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from '../../assets/airdndlogo.jpg'
import CreateSpotModal from '../CreateSpot/CreateSpotModal';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;

  sessionLinks = (
    <div className="user-session">
      <ProfileButton user={sessionUser} />
    </div>
  );

  return (
    <div className='navContainer'>
      <div className='navBar'>
        <NavLink exact to="/">
          <img className='logo' src={logo} alt=''></img>
        </NavLink>
        <div className='navBarRightSide'>
          <div className='navBarButtons'>
            <div className='becomeAHost'><CreateSpotModal /></div>
            <div className='navBarLoaded'>{isLoaded && sessionLinks}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
