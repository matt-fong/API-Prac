import React from "react";
import { useSelector } from "react-redux";
import SpotCard from "../SpotCard/SpotCard";
import './UserSpots.css'
import '../HomePage/HomePage.css'

const UserSpots = () => {
  const user = useSelector(state => state.session.user);
  const spots = useSelector((state) => Object.values(state.spots));
  const userSpots = spots.filter((spot) => spot.ownerId === user.id);

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
