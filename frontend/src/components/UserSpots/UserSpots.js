import React, { useEffect, useState } from "react";
import { NavLink, useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import { deleteSpot } from "../../store/spots";
import './UserSpots.css'
import SpotCard from "../SpotCard/SpotCard";

const UserSpots = () => {
  const user = useSelector(state => state.session.user);
  const spots = useSelector((state) => Object.values(state.spots));
  const userSpots = spots.filter((spot) => spot.ownerId === user.id);
  // console.log('THIS IS USER SPOTS', userSpots)

  // const [isLoaded, setIsLoaded] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleDelete = (spotId) => {
    dispatch(deleteSpot(spotId));
    history.push("/");
  };

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
          <div>
            <SpotCard key={spot?.id} spot={spot}/>
          </div>
            {/* <NavLink to={`/spots/${spot.id}/edit`}>Edit Spot</NavLink> */}
            <button onClick={() => history.push(`/spots/${spot.id}/edit`)}>Edit Spot</button>
            <button onClick={() => handleDelete(spot.id)}>Delete</button>
        </div>
      ))}
    </div>
  )

}

export default UserSpots;
