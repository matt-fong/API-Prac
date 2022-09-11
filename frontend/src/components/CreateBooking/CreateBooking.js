import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { createNewBooking } from "../../store/bookings";
import { getBookingsBySpotId } from "../../store/bookings";
import { getBookingsByCurrentUser } from "../../store/bookings"
import './CreateBooking.css'

const CreateBooking = ({ setStartDate, setEndDate, todayDate, startDate, endDate }) => {
  const [errors, setErrors] = useState([]);
  const { spotId } = useParams();

  const dispatch = useDispatch();
  const history = useHistory();

  const bookings = useSelector(state => Object.values(state.bookings));

  const startDateNum = new Date(startDate) - 0
  const endDateNum = new Date(endDate) - 0

  const validations = () => {
    let errors = []
    bookings?.map((booking) => {
      let bookedStartDate = (new Date(booking?.startDate) - 0)
      let bookedEndDate = (new Date(booking?.endDate) - 0)

      if (startDateNum >= endDateNum) {
        errors.push('Checkout cannot be the same as or before Check-in')
      }
      if ((startDateNum === bookedStartDate) || (startDateNum === bookedEndDate) || (endDateNum === bookedStartDate) || (endDateNum === bookedEndDate)) {
        errors.push("Chosen dates conflicts with an existing booking")
      }
      if ((startDateNum > bookedStartDate) && (startDateNum < bookedEndDate)) {
        errors.push('Chosen dates conflicts with an existing booking')
      }
      if ((startDateNum < bookedStartDate) && (endDateNum > bookedStartDate) && (endDateNum < bookedEndDate)) {
        errors.push('Chosen dates conflicts with an existing booking')
      }
      if ((startDateNum < bookedStartDate) && (endDateNum > bookedEndDate)) {
        errors.push('Chosen dates conflicts with an existing booking')
      }

      setErrors(errors)
    })
  }

  useEffect(() => {
    // dispatch(getBookingsByCurrentUser())
    dispatch(getBookingsBySpotId(spotId))
    validations()
  }, [ startDateNum, endDateNum ]);

  let errorsli;

  if (errors.length > 0) {
    errorsli = (
      <ul>
        <li>{errors[0]}</li>
      </ul>
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    let data = {
      startDate,
      endDate,
    };

    if (errors.length === 0) {
      dispatch(createNewBooking(spotId, data)).then(() => dispatch(getBookingsByCurrentUser()))
      history.push('/my-bookings')
    }

  };

  return (
    <div className="CreateBookingFormOutside">
      <div className='CreateBookingFormContainer'>
        <form className='CreateBookingform' onSubmit={handleSubmit}>
          <div className="CreateBookingErrorsContainer">
            {errorsli}
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
