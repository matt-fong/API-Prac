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

const UserBookings = () => {
  const todayString = (new Date()).toISOString().slice(0,10);
  const [startDate, setStartDate] = useState(todayString);
  const [endDate, setEndDate] = useState(todayString);

  const dispatch = useDispatch();
  const history = useHistory();

  const bookings = useSelector(state => (state.bookings));

  console.log('THIS IS BOOKINGSDFSDFSDFS', bookings)

  const handleSubmit = (e) => {
    e.preventDefault();

    let data = {
      startDate,
      endDate,
    };

    dispatch(createNewBooking(1, data))

  };


  useEffect(() => {
    dispatch(getBookingsByCurrentUser())
  }, []);

  return(
    <div>
      <form onSubmit={handleSubmit}>
          <h2></h2>
            <label>
                Start Date:</label>
                <input
                type="date"
                placeholder="mm/dd/yyyy"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
                min={todayString}
                max={"9999-12-31"}
                />

            <label>
                End Date:</label>
                <input
                type="date"
                placeholder="mm/dd/yyyy"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
                min={todayString}
                max="9999-12-31"
                />
            <input type="Submit" />
        </form>
    </div>
);
}

export default UserBookings;
