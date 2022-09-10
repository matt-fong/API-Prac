import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { createNewBooking } from "../../store/bookings";
import { getBookingsBySpotId } from "../../store/bookings";
import './CreateBooking.css'

const CreateBooking = ({ setStartDate, setEndDate, todayDate, startDate, endDate }) => {
  const [errors, setErrors] = useState([]);
  const { spotId } = useParams();

  const dispatch = useDispatch();
  const history = useHistory();

  const bookings = useSelector(state => Object.values(state.bookings));

  // console.log('THIS IS BOOKINGS BY SPOT IDDDD', bookings)

  console.log('THIS IS ERRORS', errors)

  // console.log('THIS IS TODAYS DATE', todayDate)

  const startDateNum = new Date(startDate) - 0
  const endDateNum = new Date(endDate) - 0

  // const hello = bookings.find((booking) => new Date(booking.startDate).toISOString().split('T')[0] === startDate)
  // console.log('THIS IS STARTDATE', new Date(startDate))
  // console.log('THIS IS HELLO', hello)
  // console.log('THIS IS STARTDATENUM', startDateNum)
  // console.log('THIS IS ENDDATENUM', endDateNum)

  useEffect(() => {
    // dispatch(getBookingsByCurrentUser())
    dispatch(getBookingsBySpotId(spotId))
    validations()
  }, [ errors ]);

  let validations = () => {
    bookings?.map((booking) => {
      let bookedStartDate = (new Date(booking?.startDate) - 0)
      let bookedEndDate = (new Date(booking?.endDate) - 0)

      if (startDateNum >= endDateNum) {
        setErrors({ error : 'endDate cannot be on or before startDate1' })
      }

      if ((startDateNum === bookedStartDate) || (startDateNum === bookedEndDate) || (endDateNum === bookedStartDate) || (endDateNum === bookedEndDate)) {
        setErrors({ error : "Start date conflicts with an existing booking2" })
      }

      if ((startDateNum > bookedStartDate) && (startDateNum < bookedEndDate)) {
        setErrors({ error : 'Chosen dates conflicts with an existing booking3' })
      }

      if ((startDateNum < bookedStartDate) && (endDateNum > bookedStartDate) && (endDateNum < bookedEndDate)) {
        setErrors({ error : 'Chosen dates conflicts with an existing booking4' })
      }

      if ((startDateNum < bookedStartDate) && (endDateNum > bookedEndDate)) {
        setErrors({ error : 'Chosen dates conflicts with an existing booking5' })
      }

      // if ((startDateNum < endDateNum) && (startDateNum !== bookedStartDate) && (startDateNum !== bookedEndDate) && (endDateNum !== bookedStartDate) && (endDateNum !== bookedEndDate) &&
      // ((startDateNum < bookedStartDate && endDateNum < bookedStartDate) || (startDateNum > bookedEndDate && endDateNum > bookedEndDate))) {
      //   dispatch(createNewBooking(spotId, data))
      //   history.push('/my-bookings')
      // }

      // if ((startDateNum < endDateNum) && (startDateNum !== bookedStartDate) && (startDateNum !== bookedEndDate) && (endDateNum !== bookedStartDate) && (endDateNum !== bookedEndDate) &&
      // !((startDateNum > bookedStartDate) && (startDateNum < bookedEndDate)) && !((startDateNum < bookedStartDate) && (endDateNum > bookedStartDate) && (endDateNum < bookedEndDate)) &&
      // !((startDateNum < bookedStartDate) && (endDateNum > bookedEndDate))) {
      //   dispatch(createNewBooking(spotId, data)).then(() => history.push('/my-bookings'))
      // }

    })
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    let data = {
      startDate,
      endDate,
    };

    // setErrors([]);

    if (errors?.length === 0) {
      dispatch(createNewBooking(spotId, data))
      history.push('/my-bookings')
    }

    // dispatch(createNewBooking(spotId, data))
    // console.log('THIS IS RUNNING AFTER DISPATCH')
    // history.push('/my-bookings')
  };

  return (
    <div className="CreateBookingFormOutside">
      <div className='CreateBookingFormContainer'>
        <form className='CreateBookingform' onSubmit={handleSubmit}>
          <div className="CreateBookingErrorsContainer">
            <ul>
              {Object.values(errors).map((error, i) => (
                <li className="createBookingError" key={i}>{error}</li>
              ))}
            </ul>
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
