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
import { createNewBooking } from "../../store/bookings";
import { getBookingsBySpotId } from "../../store/bookings";
import { deleteBookingById } from "../../store/bookings";

const UserBookings = () => {
  const todayString = (new Date()).toISOString().slice(0,10);
  const [startDate, setStartDate] = useState(todayString);
  const [endDate, setEndDate] = useState(todayString);
  const [errors, setErrors] = useState([]);

  const dispatch = useDispatch();
  const history = useHistory();

  const bookings = useSelector(state => (state.bookings));

  console.log('THIS IS CURRENT USER BOOKINGS', bookings)

  const handleSubmit = (e) => {
    e.preventDefault();

    let data = {
      startDate,
      endDate,
    };

    setErrors([]);
    // dispatch(createNewBooking(2, data))
    dispatch(deleteBookingById(20))
  };

  useEffect(() => {
    dispatch(getBookingsByCurrentUser())
    // dispatch(getBookingsBySpotId(1))
  }, []);

  return (
    <div className="userBookingFormOutside">
      <div className='userBookingFormContainer'>
        <form className='userbookingform' onSubmit={handleSubmit}>

          <div className="userBookingDiv">
            <input className="userBookingInputCheckin"
              type="date"
              placeholder="mm/dd/yyyy"
              // value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
              min={todayString}
              max={"9999-12-31"}
              />

            <input className="userBookingInputCheckout"
              type="date"
              placeholder="mm/dd/yyyy"
              // value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
              min={todayString}
              max="9999-12-31"
              />
          </div>

          <div className="userBookingGuest">
            <div className="userBookingGuestOne">Guests</div>
            <div className="userBookingGuestTwo">2 guests</div>
          </div>

          <div className="userBookingContainer">
            <input className="userBookingSubmit" type="Submit" value='Reserve' />
          </div>

        </form>
      </div>
    </div>
  );
}

export default UserBookings;
