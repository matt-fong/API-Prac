import React, { useEffect, useState } from "react";
import { NavLink, useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import { deleteSpot } from "../../store/spots";
import SpotCard from "../SpotCard/SpotCard";
import './UserSpots.css'
import '../HomePage/HomePage.css'

const UserSpots = () => {
  const user = useSelector(state => state.session.user);
  const spots = useSelector((state) => Object.values(state.spots));
  const userSpots = spots.filter((spot) => spot.ownerId === user.id);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleDelete = (spotId) => {
    dispatch(deleteSpot(spotId));
  };

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
        </div>
      </div>
    </div>
  )

}

export default UserSpots;
