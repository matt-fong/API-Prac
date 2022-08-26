import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import * as reviewActions from "../../store/reviews";
// import "../CSS/CreateReview.css";

const CreateReview = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  let { spotId } = useParams();

  spotId = Number(spotId);

  const [reviewMessage, setReviewMessage] = useState("");
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors([]);

    let data = {
      review: reviewMessage,
      stars: stars,
    };

    if (reviewMessage.length > 255 || reviewMessage.length < 10) {
      setErrors({ reviewMessage: "Review must be between 10 to 255 Characters!" });
    }

    // console.log('THIS IS ERRORS', errors)

    if (reviewMessage.length <= 255 && reviewMessage.length >= 10) {
      setErrors([]);
      dispatch(reviewActions.createNewReview(spotId, data))
      history.push(`/spots/${spotId}`)
    }

  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Review Form</h1>
        <ul>
          {Object.values(errors).map((error, i) => (
            <li key={i}>{error}</li>
          ))}
        </ul>
        <label>
         <span> Message: </span>
          <input
            type="text"
            placeholder="Review Message"
            value={reviewMessage}
            onChange={(e) => setReviewMessage(e.target.value)}
            required
          />
        </label>
        <label>
          <span> Stars: </span>
          <input
            placeholder="Rating"
            type="number"
            min="1"
            max="5"
            value={stars}
            onChange={(e) => setStars(e.target.value)}
            required
          />
        </label>
        {!errors.length ? (
          <button type="submit">
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
  );
};

export default CreateReview;
