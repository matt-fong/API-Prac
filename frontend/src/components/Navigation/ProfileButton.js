import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import {  useHistory } from 'react-router-dom'
import { Modal } from '../../context/Modal';
import LoginForm from "../LoginFormModal/LoginForm";
import SignUpForm from "../SignUpFormModal/SignUpForm";
import img from './xButton.jpg'
import './Navigation.css'

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const onX = () => {
    setShowLoginModal(false)
    setShowSignupModal(false)
  }

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    setShowLoginModal(false);
    setShowSignupModal(false);
    history.push('/');
  };

  let profileButton;

  if (user) {
    profileButton = (
      <div className="user-session">
      <div className="userProfileMenu">
        <button className='userProfileButton' onClick={openMenu}>
          <i className="fa-solid fa-bars fa-lg"></i>
          <i className="fas fa-user-circle fa-2xl" />
        </button>
        {showMenu && (
          <div className="profile-container">
          <div className="profile-item-container">
            <div
                className="profile-manage-listings"
                onClick={() => history.push(`/users/account/${user.id}`)}
              >
                Account
            </div>
            <div
                className="profile-manage-listings"
                onClick={() => history.push("/my-spots")}
              >
                Manage Listings
            </div>
            <div
                className="profile-manage-reviews"
                onClick={() => history.push("/my-reviews")}
              >
                Manage Reviews
            </div>
            <div
                className="profile-manage-bookings"
                onClick={() => history.push("/my-bookings")}
              >
                Manage Bookings
            </div>

            <div className="profile-logout" onClick={logout}>
              Log Out
            </div>

            </div>
          </div>
        )}

      </div>
    </div>
    )
  } else {
    profileButton = (
      <div className="user-session">
        <div className="userProfileMenu">
          <button className='userProfileButton' onClick={openMenu}>
            <i className="fa-solid fa-bars fa-lg"></i>
            <i className="fas fa-user-circle fa-2xl" />
          </button>
          {showMenu && (
            <div className="profile-container">
            <div className="profile-item-container">

              <div className='no-user-profile-login-button' onClick={() => setShowLoginModal(true)}>Log In</div>
              <div className='no-user-profile-signup-button' onClick={() => setShowSignupModal(true)}>Sign Up</div>

              </div>
            </div>
          )}

          {showLoginModal && (
            <Modal onClose={() => setShowLoginModal(false)}>
              <div className='login-modal-container'>
                <div className='login-modal-header'>
                  <img className='loginXButton' onClick={onX} src={img} alt=''></img>
                  <div className='loginLogin'>Log in</div>
                </div>
                <div className='login-modal-form'>
                  <div className='login-welcome'>Welcome to Airdnd</div>
                  <LoginForm />
                </div>
              </div>
            </Modal>
            )}

          {showSignupModal && (
            <Modal onClose={() => setShowSignupModal(false)}>
              <div className='signup-modal-container'>
                <div className='signup-modal-header'>
                <img className='signupXButton' onClick={onX} src={img} alt=''></img>
                  <div className='signupSignup'>Sign up</div>
                </div>
                <div className='signup-modal-form'>
                  <div className='signup-welcome'>Become a member of Airdnd</div>
                  <SignUpForm />
                </div>
              </div>
            </Modal>
          )}

        </div>
      </div>
    )
  }

  return (
    <>
      {profileButton}
    </>
  );
}

export default ProfileButton;
