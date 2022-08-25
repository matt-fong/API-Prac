import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteReviewById } from "../../store/reviews";
import { getAllSpots } from "../../store/spots";
import { getReviewsByCurrentUser } from "../../store/reviews";

const UserReviews = () => {
  // const user = useSelector(state => state.session.user);
  const reviews = useSelector(state => Object.values(state.reviews));

  const spots = useSelector((state) => (state.spots));
  console.log('THIS IS SPOTS', spots)
  console.log('THIS IS SINGLE SPOT', spots[2])

  // const spot = spots.find((spot) => spot.id == reviews.spotId);
  // console.log('THIS IS SPOT', spot)

  console.log('THIS IS REVIEWS', reviews)

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getReviewsByCurrentUser())
    dispatch(getAllSpots())
  }, []);

  const handleDeleteReview = (reviewId) => {
    dispatch(deleteReviewById(reviewId));
    let path = `/my-reviews`;
    history.push(path);
  };

  return (
    <div>
      {reviews.map((review) => (
        <div key={review.id}>
          <div>SPOT ID: {review.spotId}</div>
          <div></div>
          <i className="fa-solid fa-star"></i>{`${review.stars}: `}
          {review.review}
          <br></br>
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
