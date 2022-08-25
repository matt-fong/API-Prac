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

  const onSubmit = (e) => {
    e.preventDefault();

    const data = {};
    if (review) data.review = review;
    if (stars) data.stars = stars;

    setErrors([]);

    dispatch(editReview(data, reviews[reviewId].id))

      // .catch(async (res) => {
      // const data = await res.json();
      // if (data && data.errors) setErrors(data.errors);});

    history.push('/my-reviews')

  };

  return (
    <>
    <div>Edit Form</div>
    <form onSubmit={onSubmit}>
      <ul>
        {Object.values(errors).map((error, idx) => (
          <li key={idx}>{error}</li>
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
