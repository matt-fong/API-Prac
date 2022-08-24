import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getReviews, createReview } from "../../store/reviews";
import { getSpotById } from "../../store/spots";
import { getReviewsBySpotId, getReviewsByCurrentUser } from "../../store/reviews";

const UserReviews = () => {
  const user = useSelector(state => state.session.user);
  const reviews = useSelector((state) => Object.values(state.reviews));

  const { spotId } = useParams();

  console.log('THIS IS REVIEWS', reviews)

  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(getSpotById(spotId));
    // dispatch(getReviewsBySpotId(spotId));
    dispatch(getReviewsByCurrentUser())
  }, []);

  return (
    <div>
      {reviews.map((review) => (
        <div key={review.id}>{review.review}</div>
      ))}
    </div>
  )
}

export default UserReviews;
