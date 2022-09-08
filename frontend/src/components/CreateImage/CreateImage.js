import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import * as reviewActions from "../../store/reviews";
import './CreateImage.css'
import { getAllSpots } from "../../store/spots";
import { getReviewsBySpotId } from "../../store/reviews";
import { createImageBySpotId } from "../../store/images";
import { deleteImageById } from "../../store/images";

const CreateImage = ({ onX }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  let { spotId } = useParams();
  const { ownerId } = useParams()

  spotId = Number(spotId);

  const sessionUser = useSelector(state => state.session.user);
  const reviews = useSelector((state) => Object.values(state.reviews));
  const userReview = reviews.find((review) => review.userId === sessionUser.id)

  const [url, setUrl] = useState("");
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState([]);

  // useEffect(() => {
  //   dispatch(getAllSpots())
  // }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    let data = {
      url: url,
      // stars: stars,
    };

    dispatch(deleteImageById(44))

    // dispatch(createImageBySpotId(1, data))

    // history.push(`/spots/${spotId}/${ownerId}`)
    // onX()


  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="createReviewErrorContainer">
          <ul>
            {Object.values(errors).map((error, i) => (
              <li className="createReviewError" key={i}>{error}</li>
            ))}
          </ul>
        </div>
        <div className="createReviewInputContainer">
          <div className="createReviewInput">
            <input className="createReviewInputText"
              type="text"
              placeholder="Url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              // required
            />
          </div>
          {/* <div className="createReviewInput">
            <input className="createReviewInputText"
              placeholder="Stars"
              type="number"
              min="1"
              max="5"
              value={stars}
              onChange={(e) => setStars(e.target.value)}
              required
            />
          </div> */}
          <button className="createReviewSubmit" type="submit">Create Image</button>
          {/* <button className="createReviewSubmit" onClick={() => { dispatch(deleteImageById(44)) }}>Delete Image</button> */}
          <button className="createReviewSubmit" onClick={() => { onX() }}>Go Back</button>
        </div>
      </form>
    </>
  );
};

export default CreateImage;
