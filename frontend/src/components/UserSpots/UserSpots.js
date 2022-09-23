import React from "react";
import { useSelector } from "react-redux";
import SpotCard from "../SpotCard/SpotCard";
import './UserSpots.css'
import '../HomePage/HomePage.css'
import { NavLink, useHistory } from "react-router-dom";
import CreateSpotModal from '../CreateSpot/CreateSpotModal';
import CreateSpotModalTwo from "../CreateSpot/CreateSpotModalTwo";

const UserSpots = () => {
  const user = useSelector(state => state.session.user);
  const spots = useSelector((state) => Object.values(state.spots));
  const userSpots = spots.filter((spot) => spot.ownerId === user.id);

  const history = useHistory();

  let userNoSpots;

  if (Object.keys(userSpots).length === 0) {
    userNoSpots = (
      <div className="user-booking-notrip-container">
        <div className="user-booking-notrip-inner-container">
          <div className="user-booking-notrip-left">
            <img className="user-booking-notrip-hand" src='https://images.emojiterra.com/google/android-10/512px/1f44b.png' alt=''></img>
            <div className="user-booking-notrip-header">No spots listed...yet!</div>
            <div className="user-booking-notrip-undertext">Time to dust off your spot and start sharing your home</div>
            {/* <button className="user-booking-notrip-search-spots"><CreateSpotModal /></button> */}
            <CreateSpotModalTwo />
            {/* <div><CreateSpotModal /></div> */}
          </div>
          <img className="user-booking-notrip-right" src='https://a0.muscache.com/im/pictures/d727f355-3f10-44b5-9750-d1efca2438fc.jpg?im_w=720' alt=''></img>
        </div>
      </div>
    )
  }

  return (
    <div className="userSpotsContainer">
      <div className="userSpotsHeader">My Listings</div>
      <div className="spotsContainer">
        <div className="spotLayout">
          {userSpots.map((spot, i) => (
            <div key={i}>

              <div>
                <SpotCard key={spot?.id} spot={spot}/>
              </div>

            </div>
          ))}
          {userNoSpots}
        </div>
      </div>
    </div>
  )
}

export default UserSpots;
