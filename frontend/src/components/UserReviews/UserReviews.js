import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteReviewById } from "../../store/reviews";
import { getAllSpots } from "../../store/spots";
import { getReviewsByCurrentUser } from "../../store/reviews";
import ReviewCard from "../ReviewCard/ReviewCard";
import './UserReviews.css'
import { getAllUsers } from "../../store/users";
import EditReviewModal from "../EditReview/EditReviewModal";
import CreateSpotModalTwo from "../CreateSpot/CreateSpotModalTwo";

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

  let userNoReviews;

  if (Object.keys(reviews).length === 0) {
    userNoReviews = (
      <div className="UserReviewsLayoutTwo">
        <div className="user-booking-notrip-container">
          <div className="user-booking-notrip-inner-container">
            <div className="user-booking-notrip-left">
              <img className="user-booking-notrip-hand" src='https://images.emojiterra.com/google/android-10/512px/1f44b.png' alt=''></img>
              <div className="user-booking-notrip-header">No reviews...yet!</div>
              <div className="user-booking-notrip-undertext">Time to start sharing your experience with other Airdnd members</div>
              {/* <button className="user-booking-notrip-search-spots"><CreateSpotModal /></button> */}
              {/* <CreateSpotModalTwo /> */}
              {/* <div><CreateSpotModal /></div> */}
              <button className="user-booking-notrip-search" onClick={() => history.push('/')}>Start reviewing</button>
            </div>
            <img className="user-booking-notrip-right" src='https://a0.muscache.com/im/pictures/d727f355-3f10-44b5-9750-d1efca2438fc.jpg?im_w=720' alt=''></img>
          </div>
        </div>
      </div>
    )
  } else {
    userNoReviews = (
      <div className="UserReviewsLayout">
        {reviews.map((review, i) => (
          <div className="userReviewCardsContainer" key={i}>

            <div>
              <ReviewCard key={review?.id} review={review}/>
            </div>

            <div className="userSpotsButtons">
              <div><EditReviewModal reviewId={review.id}/></div>
              <button className="userSpotsDeleteButton" onClick={() => handleDelete(review.id, review.spotId)}>Delete</button>
            </div>

          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="userReviewContainer">
      <div className="userReviewInnerContainer">
        <div className="userReviewHeader">My Reviews</div>
        <div className="userReviewCardContainer">
          {userNoReviews}
        </div>
      </div>
    </div>
  );
}

export default UserReviews;
