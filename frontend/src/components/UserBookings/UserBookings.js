import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getBookingsByCurrentUser } from "../../store/bookings"
import { deleteBookingById } from "../../store/bookings";
import './UserBookings.css'
import { getAllSpots } from "../../store/spots";
import BookingCard from "../BookingCard/BookingCard";

const UserBookings = () => {
  const bookings = useSelector(state => Object.values(state.bookings));

  const todayDate = (new Date()).toISOString().slice(0,10);

  // Sorts current bookings from most recent to furthest away by endDate
  bookings.sort(function(a, b) {
    return new Date(a.endDate) - new Date(b.endDate)
  })

  // Filtering bookings so that it does not show past bookings
  const filteredBookings = bookings.filter(function(booking) {
    return booking.endDate >= todayDate
  })

  console.log('this is filteredbookings', filteredBookings)

  const [isLoaded, setIsLoaded] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getBookingsByCurrentUser()).then(() => setIsLoaded(true))
    // dispatch(getAllSpots()).then(() => setIsLoaded(true));
    // dispatch(getBookingsBySpotId(1))
  }, [ dispatch ]);

  if (!isLoaded) return null

  const handleDelete = (reviewId, spotId) => {
    dispatch(deleteBookingById(reviewId, spotId));
  };

  let userBookings;

  if (Object.keys(filteredBookings).length === 0) {
    userBookings = (
      <div className="user-booking-notrip-container">

        <div className="user-booking-notrip-inner-container">
          <div className="user-booking-notrip-left">
            <img className="user-booking-notrip-hand" src='https://images.emojiterra.com/google/android-10/512px/1f44b.png' alt=''></img>
            <div className="user-booking-notrip-header">No trips booked...yet!</div>
            <div className="user-booking-notrip-undertext">Time to dust off your bags and start planning your next adventure</div>
            <button className="user-booking-notrip-search" onClick={() => history.push('/')}>Start searching</button>
          </div>
          <img className="user-booking-notrip-right" src='https://a0.muscache.com/im/pictures/d727f355-3f10-44b5-9750-d1efca2438fc.jpg?im_w=720' alt=''></img>
        </div>

        <div className="user-booking-past-bookings">
          <NavLink to={`/my-bookings/past`}>Check past bookings</NavLink>
        </div>

      </div>
    )
  } else {
    userBookings = (
    <div className="user-booking-table-container">
      <div className="user-booking-table-inner-container">
        <table className="user-booking-table" cellSpacing="0">
          <tbody>
            <tr className="user-booking-table-header">
              <td className="user-booking-table-column">House Name</td>
              <td className="user-booking-table-column">Address</td>
              <td className="user-booking-table-column">Location</td>
              <td className="user-booking-table-column">Start Date</td>
              <td className="user-booking-table-column">End Date</td>
              <td className="user-booking-table-column">Confirmation</td>
              <td className="user-booking-table-column">Delete</td>
            </tr>
          </tbody>
          {Object.values(filteredBookings).map((booking, i) => (

          <tbody key={i}>
            <tr className="user-booking-content">
              <td className="user-booking-content-column-name">
                <NavLink to={`/spots/${booking?.Spot?.id}/${booking?.Spot?.ownerId}`}>{booking?.Spot?.name}</NavLink>
              </td>
              <td className="user-booking-content-column">{booking?.Spot?.address}</td>
              <td className="user-booking-content-column">{booking?.Spot?.city}, {booking?.Spot?.state}</td>
              <td className="user-booking-content-column">{booking?.startDate}</td>
              <td className="user-booking-content-column">{booking?.endDate}</td>
              <td className="user-booking-content-column-confirmed">
                <NavLink to={`/confirmed/${booking?.Spot.id}/${booking?.id}`}>Booking Details</NavLink>
              </td>
              <td className="user-booking-content-column">
                <button className='user-booking-delete' onClick={() => handleDelete(booking?.id)}>Cancel</button>
              </td>
            </tr>
          </tbody>

          ))}
        </table>
      </div>
      <div className="user-booking-past-bookings">
        <NavLink to={`/my-bookings/past`}>Check past bookings</NavLink>
      </div>
    </div>
    )
  }


  // return (
  //   <div className="user-booking-container">
  //     <div className="user-booking-inner-container">
  //       <div className="user-booking-header">My Bookings</div>
  //       {userBookings}
  //     </div>
  //   </div>
  // );
  return (
    <div className="homePageContainer">
      <div className="spotsContainer">
        <div className="spotLayout">
          {Object.values(filteredBookings).map((booking, i) => (
            <BookingCard booking={booking} />
          ))}
          </div>
      </div>
    </div>
  )
}

export default UserBookings;
