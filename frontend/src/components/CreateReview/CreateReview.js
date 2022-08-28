import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import * as reviewActions from "../../store/reviews";
import './CreateReview.css'

const CreateReview = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  let { spotId } = useParams();

  spotId = Number(spotId);

  const sessionUser = useSelector(state => state.session.user);

  const reviews = useSelector((state) => Object.values(state.reviews));
  // console.log('THIS IS REVIEWS', reviews)
  const userReview = reviews.find((review) => review.userId === sessionUser.id)
  // console.log('THIS IS USER REVIEW', userReview)

  const [reviewMessage, setReviewMessage] = useState("");
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState([]);

  // console.log('THIS IS ERRORS', errors)

  const handleSubmit = (e) => {
    e.preventDefault();

    // setErrors([]);

    let data = {
      review: reviewMessage,
      stars: stars,
    };

    if (userReview) {
      setErrors({ error: "User has already created a review" })
    }

    if (reviewMessage.length > 255 || reviewMessage.length < 10) {
      setErrors({ reviewMessage: "Review must be between 10 to 255 Characters!" });
    }

    if (reviewMessage.length <= 255 && reviewMessage.length >= 10 && !userReview) {
      // setErrors([]);
      dispatch(reviewActions.createNewReview(spotId, data))
      history.push(`/spots/${spotId}`)
    }

  };

  return (
    <>
      <div className="createReviewContainer">
        <div className="createReviewHeader"></div>
        <div className="createReviewForm">
          <form onSubmit={handleSubmit}>
            <ul>
              {Object.values(errors).map((error, i) => (
                <li key={i}>{error}</li>
              ))}
            </ul>
            <h1>Create a review</h1>
            <div className="createReviewInput">
              <input
                type="text"
                placeholder="Review Message"
                value={reviewMessage}
                onChange={(e) => setReviewMessage(e.target.value)}
                required
              />
            </div>
            <div className="createReviewInput">
              <input
                placeholder="Stars"
                type="number"
                min="1"
                max="5"
                value={stars}
                onChange={(e) => setStars(e.target.value)}
                required
              />
            </div>
            {!errors.length ? (
              <button className="createReviewButton" type="submit">
                Create Review
              </button>
            ) : (
              <button
                className="backButton"
                onClick={() => {
                  let path = `/spots/${spotId}`;
                  history.push(path);
                }}
              >
                Go Back
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateReview;
