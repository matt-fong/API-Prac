import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteReviewById } from "../../store/reviews";
import { getAllSpots } from "../../store/spots";
import { getReviewsByCurrentUser } from "../../store/reviews";
import ReviewCard from "../ReviewCard/ReviewCard";
import './CreateBooking.css'
import { getAllUsers } from "../../store/users";
import { getBookingsByCurrentUser } from "../../store/bookings"
import { createNewBooking } from "../../store/bookings";
import { getBookingsBySpotId } from "../../store/bookings";
import { deleteBookingById } from "../../store/bookings";

const CreateBooking = () => {
  const todayString = (new Date()).toISOString().slice(0,10);
  const [startDate, setStartDate] = useState(todayString);
  const [endDate, setEndDate] = useState(todayString);
  const [errors, setErrors] = useState([]);
  const { spotId } = useParams();

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

    console.log('THIS IS THE SPOT ID', spotId)

    setErrors([]);
    dispatch(createNewBooking(spotId, data))
    // dispatch(deleteBookingById(20))

    history.push('/my-bookings')
  };

  useEffect(() => {
    dispatch(getBookingsByCurrentUser())
    // dispatch(getBookingsBySpotId(1))
  }, []);

  return (
    <div className="CreateBookingFormOutside">
      <div className='CreateBookingFormContainer'>
        <form className='CreateBookingform' onSubmit={handleSubmit}>

          <div className="CreateBookingDiv">
            <input className="CreateBookingInputCheckin"
              type="date"
              placeholder="mm/dd/yyyy"
              // value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
              min={todayString}
              max={"9999-12-31"}
              />

            <input className="CreateBookingInputCheckout"
              type="date"
              placeholder="mm/dd/yyyy"
              // value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
              min={todayString}
              max="9999-12-31"
              />
          </div>

          <div className="CreateBookingGuest">
            <div className="CreateBookingGuestOne">Guests</div>
            <div className="CreateBookingGuestTwo">2 guests</div>
          </div>

          <div className="CreateBookingContainer">
            <input className="CreateBookingSubmit" type="Submit" defaultValue='Reserve' />
          </div>

        </form>
      </div>
    </div>
  );
}

export default CreateBooking;
