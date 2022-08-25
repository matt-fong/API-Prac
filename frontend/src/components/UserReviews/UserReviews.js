import { useParams, NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getReviews, createReview, deleteReviewById } from "../../store/reviews";
import { getSpotById } from "../../store/spots";
import { getReviewsBySpotId, getReviewsByCurrentUser } from "../../store/reviews";

const UserReviews = () => {
  const user = useSelector(state => state.session.user);
  const reviews = useSelector((state) => Object.values(state.reviews));

  console.log('THIS IS REVIEWS', reviews)

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getReviewsByCurrentUser())
  }, []);

  const handleDeleteReview = (reviewId) => {
    dispatch(deleteReviewById(reviewId));
    let path = `/my-reviews`;
    history.push(path);
  };

  return (
    <div>
      {reviews.map((review) => (
        <div key={review.id}>{review.review}
          <NavLink to={`/reviews/${review.id}`}>Edit Review</NavLink>
          <button onClick={() => handleDeleteReview(review.id)}>
            Delete Review
          </button>
        </div>
      ))}
    </div>
  )
}

export default UserReviews;
