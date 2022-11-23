import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as reviewActions from "../../store/reviews";
import './ViewImages.css'
import { getAllSpots, spotsReducer } from "../../store/spots";
import { getReviewsBySpotId } from "../../store/reviews";

const ViewImages = ({ onX, spot }) => {

  const sessionUser = useSelector(state => state.session.user);

  const spotImagesArr = spot?.Images

  // console.log("THIS IS SPOT IMAGES ARR", spotImagesArr)

  return (
    <>
      <div>
        {spotImagesArr.map((image, i) =>
          <div key={i}>
            <img className='viewimages-image' src={image?.url}></img>
          </div>
        )}
      </div>

      {/* <div>
        <img className='viewimages-image' src={spotImagesArr[0]?.url}></img>
      </div> */}
    </>
  );
};

export default ViewImages;
