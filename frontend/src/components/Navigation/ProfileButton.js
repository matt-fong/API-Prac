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
  };

  return (
    <div className="session-links">
      <div className="profile-menu">
        <button onClick={openMenu}>
          <i className="fas fa-user-circle" />
        </button>
        {showMenu && (
          <div className="profile-dropdown-container">
          <div className="dropdown-items-container">
            <div className="profile-email">{`Hello, ${user.firstName}`}</div>

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

            <div>
              <button className="profile-logout"onClick={logout}>Log Out</button>
            </div>
            </div>
          </div>
        )}
     </div>
    </div>
  );
}

export default ProfileButton;
