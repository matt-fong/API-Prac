import React from "react";
import { useSelector } from "react-redux";
import './HomePage.css'
import SpotCard from "../SpotCard/SpotCard";

const HomePage = () => {
  const spots = useSelector((state) => Object.values(state.spots));

  return (
    <div className="homePageContainer">
      <div className="spotsContainer">
        <div className="spotLayout">
          {spots.map((spot) => (
            <SpotCard key={spot.id} spot={spot}/>
          ))}
          </div>
      </div>
    </div>
  )
}

export default HomePage;
