import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteReviewById } from "../../store/reviews";
import { getAllSpots } from "../../store/spots";
import { getReviewsByCurrentUser } from "../../store/reviews";
import ReviewCard from "../ReviewCard/ReviewCard";
import './UserReviews.css'
import { getAllUsers } from "../../store/users";

const UserReviews = () => {
  const reviews = useSelector(state => Object.values(state.reviews));

  const [isLoaded, setIsLoaded] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  console.log('THIS IS REVIEWS', reviews)

  useEffect(() => {
    dispatch(getReviewsByCurrentUser()).then(() => setIsLoaded(true))
    dispatch(getAllUsers())
    // dispatch(getAllSpots())
  }, []);

  // if (!isLoaded) return null

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
                <button className="userSpotsEditButton" onClick={() => history.push(`/reviews/${review.id}`)}>Edit Review</button>
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
