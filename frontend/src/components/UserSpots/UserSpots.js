import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getOwnedSpots } from "../../store/spots";
import { deleteSpot } from "../../store/spots";

const UserSpots = () => {
  const user = useSelector(state => state.session.user);
  const spots = useSelector((state) => Object.values(state.spots));
  const userSpots = spots.filter((spot) => spot.ownerId === user.id);

  console.log('THIS IS USER', user)
  console.log('THIS IS SPOTS', spots)
  console.log('THIS IS USERSPOTS', userSpots)

  return (
    <div>
      {userSpots.map((spot, i) => (
        <div key={i}>
          <div>
            {spot.name}
          </div>
          <div>
            {spot.avgRating}
          </div>
          <div>
            {spot.city}, {spot.state}, {spot.country}
          </div>
        </div>
      ))}
    </div>
  )
}

export default UserSpots;
