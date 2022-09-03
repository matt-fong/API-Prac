import { NavLink, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteReviewById } from "../../store/reviews";
import { getAllSpots } from "../../store/spots";
import { getReviewsByCurrentUser } from "../../store/reviews";
import ReviewCard from "../ReviewCard/ReviewCard";
import './CurrentBookings.css'
import { getAllUsers } from "../../store/users";
import { getBookingsByCurrentUser } from "../../store/bookings"
import { deleteBookingById } from "../../store/bookings";
import { getBookingsBySpotId } from "../../store/bookings";

const CurrentBookings = () => {
  const bookings = useSelector(state => (state.bookings));
  console.log('THIS IS USERS BOOKINGS123123', bookings)

  // console.log('THIS IS BOOOOOOOOKINGS', new Date(bookings[0]?.endDate).toISOString().split('T')[0])

  const [isLoaded, setIsLoaded] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const { spotId } = useParams()

  useEffect(() => {
    // dispatch(getBookingsByCurrentUser()).then(() => setIsLoaded(true))
    // dispatch(getAllSpots()).then(() => setIsLoaded(true));
    // dispatch(getBookingsBySpotId(1))
    dispatch(getBookingsBySpotId(spotId)).then(() => setIsLoaded(true))
  }, []);

  if (!isLoaded) return null

  const handleDelete = (reviewId, spotId) => {
    dispatch(deleteBookingById(reviewId, spotId));
  };

  return (
    <div className="current-booking-container">
      <div className="current-booking-inner-container">
        <h1 className="current-booking-header">Current Bookings</h1>
        <div className="current-booking-table-container">
          <table className="current-booking-table" cellSpacing="0">
            <tbody>
              <tr className="current-booking-table-header">
                <td className="current-booking-table-column">Spot ID</td>
                <td className="current-booking-table-column">Start Date</td>
                <td className="current-booking-table-column">End Date</td>
              </tr>
            </tbody>
            {Object.values(bookings).map((booking, i) => (

            <tbody key={i}>
              <tr className="current-booking-content">
                <td className="current-booking-content-column">{booking.spotId}</td>
                <td className="current-booking-content-column">{booking.startDate}</td>
                <td className="current-booking-content-column">{booking.endDate}</td>
              </tr>
            </tbody>

            ))}
          </table>
          <button className='current-booking-go-back' onClick={() => history.goBack()}>Go Back</button>
        </div>
      </div>
    </div>
  );
}

export default CurrentBookings;
