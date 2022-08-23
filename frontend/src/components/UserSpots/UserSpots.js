import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";

const UserSpots = () => {
  const user = useSelector(state => state.session.user);
  const spots = useSelector((state) => Object.values(state.spots));
  const userSpots = spots.filter((spot) => spot.ownerId === user.id);

  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   if (password === confirmPassword) {
  //     setErrors([]);
  //     return dispatch(sessionActions.editSpot({ email, username, password, firstName, lastName }))
  //   }
  // };

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
            <NavLink to={`/spots/${spot.id}/edit`}>Edit Spot</NavLink>
        </div>
      ))}
    </div>
  )
}

export default UserSpots;
