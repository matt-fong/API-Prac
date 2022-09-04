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
  const todayDate = (new Date()).toISOString().slice(0,10);
  const [startDate, setStartDate] = useState(todayDate);
  const [endDate, setEndDate] = useState(todayDate);
  const [errors, setErrors] = useState([]);
  const { spotId } = useParams();

  const dispatch = useDispatch();
  const history = useHistory();

  const bookings = useSelector(state => Object.values(state.bookings));

  console.log('THIS IS BOOKINGS BY SPOT IDDDD', bookings)

  console.log('THIS IS ERRORS', errors)

  console.log('THIS IS TODAYS DATE', todayDate)

  const handleSubmit = (e) => {
    e.preventDefault();

    let data = {
      startDate,
      endDate,
    };


    // console.log('THIS IS THE SPOT ID', spotId)

    // setErrors([]);

    // bookings.map((booking) => {
    //   const bookedStartDate = new Date(booking.startDate).toISOString().split('T')[0]
    //   const bookedEndDate = new Date(booking.endDate).toISOString().split('T')[0]

    //   console.log('THIS IS THE BOOKED START DATE', bookedStartDate)
    //   console.log('THIS IS THE REGULAR START DATE', startDate)
    //   console.log('THIS IS THE BOOKED END DATE', bookedEndDate)
    //   console.log('THIS IS THE REGULAR END DATE', endDate)

    //   if (startDate >= bookedStartDate || startDate < bookedEndDate) {
    //     console.log('FIRST LINE OF DEFENSE')
    //     errors.push({ error: "Sorry this spot is already booked for the specified dates." })
    //     console.log('THIS IS THE ERRORS', errors)
    //   }

    //   if (startDate === bookedStartDate || endDate === bookedEndDate) {
    //     console.log('SECOND LINE OF DEFENSE')
    //     errors.push({ error: "Sorry this spot is already booked for the specified dates." })
    //     console.log('THIS IS THE ERRORS', errors)
    //   }

    //   if (endDate > bookedStartDate || endDate <= bookedEndDate) {
    //     console.log('THIRD LINE OF DEFENSE')
    //     errors.push({ error: "Sorry this spot is already booked for the specified dates." })
    //     console.log('THIS IS THE ERRORS', errors)
    //   }


    //   if (startDate >= todayDate && startDate !== bookedEndDate && endDate !==bookedEndDate && !errors.length) {
    //     dispatch(createNewBooking(spotId, data))
    //     console.log('WHY IS THIS RUNNING')
    //     history.push('/my-bookings')
    //   }

    //   console.log('TRUE OR FALSE?', startDate >= todayDate && startDate !== bookedEndDate && endDate !==bookedEndDate)

    // })

    dispatch(createNewBooking(spotId, data))
    history.push('/my-bookings')
  };

  useEffect(() => {
    // dispatch(getBookingsByCurrentUser())
    dispatch(getBookingsBySpotId(spotId))
  }, []);

  return (
    <div className="CreateBookingFormOutside">
      <div className='CreateBookingFormContainer'>
        <form className='CreateBookingform' onSubmit={handleSubmit}>
          <div className="CreateBookingErrorsContainer">
            {/* <ul>
              {(errors).map((error, i) => (
                <li className="loginError" key={i}>{error}</li>
              ))}
            </ul> */}
          </div>
          <div className="CreateBookingDiv">
            <input className="CreateBookingInputCheckin"
              type="date"
              placeholder="mm/dd/yyyy"
              // value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
              min={todayDate}
              max={"9999-12-31"}
              />

            <input className="CreateBookingInputCheckout"
              type="date"
              placeholder="mm/dd/yyyy"
              // value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
              min={todayDate}
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
