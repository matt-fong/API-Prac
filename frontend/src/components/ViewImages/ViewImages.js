import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as reviewActions from "../../store/reviews";
import './ViewImages.css'
import { getAllSpots, spotsReducer } from "../../store/spots";
import { getReviewsBySpotId } from "../../store/reviews";
import { deleteImageById } from "../../store/images";

const ViewImages = ({ onX, spot }) => {

  const sessionUser = useSelector(state => state.session.user);

  const spotImagesArr = spot?.Images

  console.log("THIS IS SPOT IMAGES ARR", spotImagesArr)

  const dispatch = useDispatch();


  return (
    <>
      <div>
        {spotImagesArr.map((image, i) =>
          <div key={i}>
            <img className='viewimages-image' src={image?.url}></img>
            <div>
              <i className="viewimages-trash fa-solid fa-trash fa-lg" onClick={() => dispatch(deleteImageById(image?.id)).then(dispatch(getAllSpots()))}></i>
            </div>
            {/* <div onClick={() => dispatch(deleteImageById(image?.id)).then(dispatch(getAllSpots()))}>Delete</div> */}
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
