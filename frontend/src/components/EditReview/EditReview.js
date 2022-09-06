import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { editReview } from "../../store/reviews";
import { getAllSpots } from "../../store/spots";
import { getReviewsByCurrentUser } from "../../store/reviews";
import './EditReview.css'

const EditReview = ({ onX, reviewId }) => {
  const reviews = useSelector(state => state.reviews);
  // const { reviewId } = useParams();
  const { spotId } = useParams();

  // console.log('THIS IS REVIEW IDDDDDDDDDDDDD', reviewId)

  const spot = reviews[reviewId]

  const dispatch = useDispatch();
  const history = useHistory()

  const [reviewMessage, setReviewMessage] = useState(reviews[reviewId]?.review);
  const [stars, setStars] = useState(reviews[reviewId]?.stars);
  const [errors, setErrors] = useState([]);

  // console.log('THIS IS REVIEW MESSAGE', reviewMessage)

  // might not need this
  useEffect(() => {
    dispatch(getReviewsByCurrentUser())
    dispatch(getAllSpots())
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    setErrors([]);

    const data = {};
    if (reviewMessage) data.reviewMessage = reviewMessage;
    if (stars) data.stars = stars;

    if (reviewMessage.length > 255 || reviewMessage.length < 10) {
      setErrors({ reviewMessage: "ReviewMessage must be between 10 to 255 Characters!" });
    }

    if(reviewMessage.length <= 255 && reviewMessage.length >= 10) {
      dispatch(editReview(data, reviewId))
      // history.push(`/spots/${spotId}/${spot?.Spot.ownerId}`)
      onX()
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
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
          <button className="createReviewSubmit" type="submit">Edit Review</button>
          <button className="createReviewSubmit" onClick={() => { onX() }}>Go Back</button>
        </div>
      </form>
    </>
  );
}

export default EditReview;
