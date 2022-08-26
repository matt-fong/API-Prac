import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { editReview } from "../../store/reviews";
import { getAllSpots } from "../../store/spots";
import { getReviewsByCurrentUser } from "../../store/reviews";

const EditReview = () => {
  const reviews = useSelector(state => state.reviews);
  const { reviewId } = useParams();

  console.log('THIS IS REVIEWS', reviews)

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
      dispatch(editReview(data, reviews[reviewId].id))
      history.push('/my-reviews')
    }
  };

  return (
    <>
    <div>Edit Form</div>
    <form onSubmit={onSubmit}>
      <ul>
        {Object.values(errors).map((error, i) => (
          <li key={i}>{error}</li>
        ))}
      </ul>
      <div>
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
      </div>
      <button type="submit">
        Submit
      </button>
    </form>
    </>
  );
}

export default EditReview;
