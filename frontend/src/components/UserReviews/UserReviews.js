import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteReviewById } from "../../store/reviews";
import { getAllSpots } from "../../store/spots";
import { getReviewsByCurrentUser } from "../../store/reviews";
import ReviewCard from "../ReviewCard/ReviewCard";
import './UserReviews.css'

const UserReviews = () => {
  // const user = useSelector(state => state.session.user);
  const reviews = useSelector(state => Object.values(state.reviews));


  console.log('THIS IS REVIEWS', reviews)

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getReviewsByCurrentUser())
    dispatch(getAllSpots())
  }, []);

  // const handleDeleteReview = (reviewId) => {
  //   dispatch(deleteReviewById(reviewId));
  //   let path = `/my-reviews`;
  //   history.push(path);
  // };

  const handleDelete = (reviewId, spotId) => {
    dispatch(deleteReviewById(reviewId, spotId));
  };

  return (
    <div className="userReviewContainer">
      <div className="userReviewInnerContainer">
        <h1 className="userReviewHeader">User Reviews</h1>
        <div className="userReviewCardContainer">
        <div className="spotLayout">
          {reviews.map((review, i) => (
            <div key={i}>

              <div>
                <ReviewCard key={review?.id} review={review}/>
              </div>

              <div className="userSpotsButtons">
                <button className="userSpotsEditButton" onClick={() => history.push(`/reviews/${review.id}`)}>Edit Spot</button>
                <button className="userSpotsDeleteButton" onClick={() => handleDelete(review.id, review.spotId)}>Delete</button>
              </div>

            </div>
          ))}
        </div>
        </div>
      </div>
    </div>
  );
}

export default UserReviews;
