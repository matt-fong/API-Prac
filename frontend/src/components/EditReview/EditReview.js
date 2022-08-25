import { useParams, NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getReviews, createReview, deleteReviewById, editReview } from "../../store/reviews";
import { getSpotById } from "../../store/spots";
import { getReviewsBySpotId, getReviewsByCurrentUser } from "../../store/reviews";

const EditReview = () => {
  const reviews = useSelector(state => state.reviews);
  const { reviewId } = useParams();

  console.log('THIS IS REVIEWS', reviews)

  const dispatch = useDispatch();
  const history = useHistory()

  const [review, setReview] = useState(reviews[reviewId]?.review);
  const [stars, setStars] = useState(reviews[reviewId]?.stars);
  const [errors, setErrors] = useState([]);

  const validations = () => {
    let errors = []
    if (!stars || stars > 5 || stars < 1) errors.push("Stars must be an integer from 1 to 5")
    if (!review || review.length > 255) errors.push("Review text is required or is greater than 255")
    setErrors(errors)
  }

  useEffect(() => {
    validations()
  }, [ review, stars ])


  const onSubmit = (e) => {
    e.preventDefault();

    const data = {};
    if (review) data.review = review;
    if (stars) data.stars = stars;

    if(!errors.length) {
      dispatch(editReview(data, reviews[reviewId].id))
      history.push('/my-reviews')
    }

  };

  return (
    <>
    <div>Edit Form</div>
    <form onSubmit={onSubmit}>
      <ul>
        {(errors).map((error, i) => (
          <li key={i}>{error}</li>
        ))}
      </ul>
      <div>
        <input
          placeholder="Review"
          type="text"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
      </div>
      <div>
        <input
          placeholder="Stars"
          type="number"
          value={stars}
          onChange={(e) => setStars(e.target.value)}
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
