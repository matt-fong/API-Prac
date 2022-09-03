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
import { deleteBookingById } from "../../store/bookings";

const UserBookings = () => {
  const bookings = useSelector(state => (state.bookings));
  console.log('THIS IS USERS BOOKINGS123123', bookings)

  // console.log('THIS IS BOOOOOOOOKINGS', new Date(bookings[0]?.endDate).toISOString().split('T')[0])

  const [isLoaded, setIsLoaded] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getBookingsByCurrentUser()).then(() => setIsLoaded(true))
    // dispatch(getAllSpots()).then(() => setIsLoaded(true));
    // dispatch(getBookingsBySpotId(1))
  }, []);

  if (!isLoaded) return null

  const handleDelete = (reviewId, spotId) => {
    dispatch(deleteBookingById(reviewId, spotId));
  };

  return (
    <div className="user-booking-container">
      <div className="user-booking-inner-container">
        <h1 className="user-booking-header">User Bookings</h1>
        <div className="user-booking-table-container">
          <table className="user-booking-table" cellSpacing="0">
            <tbody>
              <tr className="user-booking-table-header">
                <td className="user-booking-table-column">House Name</td>
                <td className="user-booking-table-column">Address</td>
                <td className="user-booking-table-column">Location</td>
                <td className="user-booking-table-column">Start Date</td>
                <td className="user-booking-table-column">End Date</td>
                <td className="user-booking-table-column">Edit</td>
                <td className="user-booking-table-column">Delete</td>
              </tr>
            </tbody>
            {Object.values(bookings).map((booking, i) => (

            <tbody key={i}>
              <tr className="user-booking-content">
                <td className="user-booking-content-column-name">
                  <NavLink to={`/spots/${booking.Spot.id}/${booking.Spot.ownerId}`}>{booking.Spot.name}</NavLink>
                </td>
                <td className="user-booking-content-column">{booking.Spot.address}</td>
                <td className="user-booking-content-column">{booking.Spot.city}, {booking.Spot.state}</td>
                <td className="user-booking-content-column">{booking.startDate}</td>
                <td className="user-booking-content-column">{booking.endDate}</td>
                <td className="user-booking-content-column">Edit</td>
                <td className="user-booking-content-column">
                  <button className='user-booking-delete' onClick={() => handleDelete(booking.id)}>Delete Booking</button>
                </td>
              </tr>
            </tbody>

            ))}
          </table>
        </div>
      </div>
    </div>
  );
}

export default UserBookings;
