import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteReviewById } from "../../store/reviews";
import { getAllSpots } from "../../store/spots";
import { getReviewsByCurrentUser } from "../../store/reviews";
import ReviewCard from "../ReviewCard/ReviewCard";
import './UserBookings.css'
import { getAllUsers } from "../../store/users";
import { getBookingsByCurrentUser } from "../../store/bookings"

const UserBookings = () => {
  const bookings = useSelector(state => Object.values(state.bookings));
  console.log('THIS IS USERS BOOKINGS', bookings)

  // console.log('THIS IS BOOOOOOOOKINGS', new Date(bookings[0]?.endDate).toISOString().split('T')[0])

  const [isLoaded, setIsLoaded] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getAllSpots()).then(() => setIsLoaded(true));
    dispatch(getBookingsByCurrentUser())
    // dispatch(getBookingsBySpotId(1))
  }, []);

  if (!isLoaded) return null

  const handleDelete = (reviewId, spotId) => {
    dispatch(deleteReviewById(reviewId, spotId));
  };

  return (
    <div className="userReviewContainer">
      <div className="userReviewInnerContainer">
        <h1 className="userReviewHeader">User Bookings</h1>
        <div className="userReviewCardContainer">
        <div className="spotLayout">
          {bookings.map((booking, i) => (
            <div key={i}>

              <div>SPOT ID:{booking.spotId}, SPOT NAME:{booking.Spot.name}, START DATE: {booking.startDate}, END DATE: {booking.endDate}</div>

              {/* <div>
                <ReviewCard key={review?.id} review={review}/>
              </div> */}

              {/* <div className="userSpotsButtons">
                <button className="userSpotsEditButton" onClick={() => history.push(`/reviews/${review.id}/${review.spotId}`)}>Edit Review</button>
                <button className="userSpotsDeleteButton" onClick={() => handleDelete(review.id, review.spotId)}>Delete</button>
              </div> */}

            </div>
          ))}
        </div>
        </div>
      </div>
    </div>
  );
}

export default UserBookings;
