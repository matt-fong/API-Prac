import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as reviewActions from "../../store/reviews";
import './CreateReview.css'
import { getAllSpots } from "../../store/spots";
import { getReviewsBySpotId } from "../../store/reviews";

const CreateReview = ({ onX }) => {
  const dispatch = useDispatch();
  let { spotId } = useParams();

  spotId = Number(spotId);

  const sessionUser = useSelector(state => state.session.user);
  const reviews = useSelector((state) => Object.values(state.reviews));
  const userReview = reviews.find((review) => review.userId === sessionUser.id)

  const [reviewMessage, setReviewMessage] = useState("");
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let data = {
      review: reviewMessage,
      stars: stars,
    };

    let errors = [];

    if (userReview) {
      errors.push( "User has already created a review." )
    }

    if (reviewMessage.length > 255 || reviewMessage.length < 10) {
      errors.push( "Review must be between 10 to 255 Characters!" );
    }

    setErrors(errors)

    if (reviewMessage.length <= 255 && reviewMessage.length >= 10 && !userReview) {
      dispatch(reviewActions.createNewReview(spotId, data)).then(() => dispatch(getReviewsBySpotId(spotId))).then(() => dispatch(getAllSpots()))
      onX()
    }

  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="createReviewErrorContainer">
          <div className="createReviewError">
            {(errors).map((error, i) => (
              <div className="errorMessageContainer" key={i}>
                <i class="fa-solid fa-exclamation exclamation-point"></i>
                <div className="errorMessage">{error}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="createReviewInputContainer">
          <div className="createReviewInput">
            <input className="createReviewInputText"
              type="text"
              placeholder="Review Message"
              value={reviewMessage}
              onChange={(e) => setReviewMessage(e.target.value)}
              required
            />
          </div>
          <div className="createReviewInput">
            <input className="createReviewInputText"
              placeholder="Stars"
              type="number"
              min="1"
              max="5"
              value={stars}
              onChange={(e) => setStars(e.target.value)}
              required
            />
          </div>
          <button className="createReviewSubmit" type="submit">Create Review</button>
          {/* <button className="createReviewSubmit" onClick={() => { onX() }}>Go Back</button> */}
        </div>
      </form>
    </>
  );
};

export default CreateReview;
