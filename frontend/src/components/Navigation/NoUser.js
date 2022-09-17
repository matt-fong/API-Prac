import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import {  useHistory } from 'react-router-dom'
import LoginModal from '../LoginFormModal/LoginFormModal';
import SignUpModal from '../SignUpFormModal/SignUpFormModal';
import LoginForm from "../LoginFormModal/LoginForm";
import SignUpForm from "../SignUpFormModal/SignUpForm";
import { Modal } from '../../context/Modal';
import './Navigation.css'

function NoUser() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  return (
    <div className="user-session">
      <div className="userProfileMenu">
        <button className='userProfileButton' onClick={openMenu}>
          <i className="fa-solid fa-bars fa-lg"></i>
          <i className="fas fa-user-circle fa-2xl" />
        </button>
        {showMenu && (
          <div className="profile-container">
          <div className="profile-item-container">

              <div className="profile-manage-listings">
                <LoginModal />
              </div>

              <div className="profile-manage-reviews">
                <SignUpModal />
              </div>

            </div>
          </div>
        )}
     </div>
    </div>
  );
}

export default NoUser;
