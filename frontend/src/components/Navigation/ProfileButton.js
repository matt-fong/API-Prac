import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { NavLink, useHistory } from 'react-router-dom'

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);

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
    history.push('/')
  };

  return (
    <div className="user-session">
      <div className="userProfileMenu">
        <button onClick={openMenu}>
          <i className="fa-solid fa-bars"></i>
          <i className="fas fa-user-circle fa-2xl" />
        </button>
        {showMenu && (
          <div className="profile-container">
          <div className="profile-item-container">
            <div className="profile-name">{`Hello, ${user.firstName}`}</div>
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
                className="profile-host-home"
                onClick={() => history.push("/create-spot")}
              >
                Host your home
              </div>
            <div className="profile-logout"onClick={logout}>
              Log Out
            </div>
            </div>
          </div>
        )}
     </div>
    </div>
  );
}

export default ProfileButton;
