import React from "react";
import './HomePage.css'
import SpotCard from "../SpotCard/SpotCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllSpots } from "../../store/spots";

const HomePage = () => {
  const spots = useSelector((state) => Object.values(state.spots));

  // console.log(spots)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSpots())
  }, []);

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
