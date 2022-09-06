import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import * as reviewActions from "../../store/reviews";
import './CreateReview.css'
import { getAllSpots } from "../../store/spots";
import { getReviewsBySpotId } from "../../store/reviews";

const CreateReview = ({ onX }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  let { spotId } = useParams();
  const { ownerId } = useParams()

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

    if (userReview) {
      setErrors({ error: "User has already created a review." })
    }

    if (reviewMessage.length > 255 || reviewMessage.length < 10) {
      setErrors({ reviewMessage: "Review must be between 10 to 255 Characters!" });
    }

    if (reviewMessage.length <= 255 && reviewMessage.length >= 10 && !userReview) {
      dispatch(reviewActions.createNewReview(spotId, data)).then(() => dispatch(getReviewsBySpotId(spotId)))
      // history.push(`/spots/${spotId}/${ownerId}`)
      onX()
    }

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
          <button className="createReviewSubmit" onClick={() => { onX() }}>Go Back</button>
        </div>
      </form>
    </>
  );
};

export default CreateReview;
