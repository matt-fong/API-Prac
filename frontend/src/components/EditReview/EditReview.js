import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { editReview } from "../../store/reviews";
import { getAllSpots } from "../../store/spots";
import { getReviewsByCurrentUser } from "../../store/reviews";
import './EditReview.css'

const EditReview = ({ onX }) => {
  const reviews = useSelector(state => state.reviews);
  const { reviewId } = useParams();
  const { spotId } = useParams();

  const spot = reviews[reviewId]

  const dispatch = useDispatch();
  const history = useHistory()

  const [review, setReview] = useState(reviews[reviewId]?.review);
  const [stars, setStars] = useState(reviews[reviewId]?.stars);
  const [errors, setErrors] = useState([]);

  // might not need this
  useEffect(() => {
    dispatch(getReviewsByCurrentUser())
    dispatch(getAllSpots())
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    setErrors([]);

    const data = {};
    if (review) data.review = review;
    if (stars) data.stars = stars;

    if (review.length > 255 || review.length < 10) {
      setErrors({ review: "Review must be between 10 to 255 Characters!" });
    }

    if(review.length <= 255 && review.length >= 10) {
      dispatch(editReview(data, reviewId))
      // history.push(`/spots/${spotId}/${spot?.Spot.ownerId}`)
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
        {/* <div>
          <input
            placeholder="Review"
            type="text"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            placeholder="Stars"
            type="number"
            min="1"
            max="5"
            value={stars}
            onChange={(e) => setStars(e.target.value)}
            required
          />
        </div> */}
        <div className="createReviewInputContainer">
          <div className="createReviewInput">
            <input className="createReviewInputText"
              type="text"
              placeholder="Review Message"
              value={review}
              onChange={(e) => setReview(e.target.value)}
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
        {/* <button type="submit">
          Submit
        </button> */}
      </form>
    </>
  );
}

export default EditReview;
