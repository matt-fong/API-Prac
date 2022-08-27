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
  // console.log('THIS IS USER SPOTS', userSpots)

  // const [isLoaded, setIsLoaded] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleDelete = (spotId) => {
    dispatch(deleteSpot(spotId));
    history.push("/");
  };

  return (
    <div className="homePageContainer">
      <h1 className="userSpotsHeader">User Spots</h1>
      <div className="spotsContainer">
        <div className="spotLayout">
          {userSpots.map((spot, i) => (
            <div key={i}>

              <div>
                <SpotCard key={spot?.id} spot={spot}/>
              </div>

              <button onClick={() => history.push(`/spots/${spot.id}/edit`)}>Edit Spot</button>
              <button onClick={() => handleDelete(spot.id)}>Delete</button>

            </div>
          ))}
        </div>
      </div>
    </div>
  )

}

export default UserSpots;
