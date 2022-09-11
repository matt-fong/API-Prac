import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteBookingById } from "../../store/bookings";
import { getBookingsBySpotId } from "../../store/bookings";
import { getAllSpots } from "../../store/spots";
import './CurrentBookings.css'

const CurrentBookings = () => {
  const bookings = useSelector(state => Object.values(state.bookings));
  // console.log('THIS IS USERS BOOKINGS', bookings)
  // console.log('THIS IS BOOOOOOOOKINGS', new Date(bookings[0]?.endDate).toISOString().split('T')[0])

  const todayDate = (new Date()).toISOString().slice(0,10);

  // Sorts current bookings from most recent to furthest away by startDate
  bookings.sort(function(a, b) {
    return new Date(a.startDate) - new Date(b.startDate)
  })

  // Filtering bookings so that it does not show past bookings
  const filteredBookings = bookings.filter(function(booking) {
    return booking.startDate >= todayDate
  })

  // console.log('THIS IS FILTERED BOOKINGS', filteredBookings)

  const spots = useSelector((state) => (state.spots));
  // console.log('THIS IS SPOTS', spots)

  const { spotId } = useParams()

  const spot = spots[spotId]
  // console.log('THIS IS SINGLE SPOT', spot)

  const [isLoaded, setIsLoaded] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();


  useEffect(() => {
    // dispatch(getBookingsByCurrentUser()).then(() => setIsLoaded(true))
    dispatch(getAllSpots()).then(() => setIsLoaded(true));
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
        <div className="current-booking-header">Current Bookings for {spot?.name}</div>
        <div className="current-booking-table-container">
          <div className="current-booking-table-inner-container">
            <table className="current-booking-table" cellSpacing="0">
              <tbody>
                <tr className="current-booking-table-header">
                  {/* <td className="current-booking-table-column">Name</td> */}
                  <td className="current-booking-table-column">Start Date</td>
                  <td className="current-booking-table-column">End Date</td>
                </tr>
              </tbody>
              {filteredBookings?.map((booking, i) => (

              <tbody key={i}>
                <tr className="current-booking-content">
                  {/* <td className="current-booking-content-column">{spot.name}</td> */}
                  <td className="current-booking-content-column">{new Date(booking.startDate).toISOString().split('T')[0]}</td>
                  <td className="current-booking-content-column">{new Date(booking.endDate).toISOString().split('T')[0]}</td>
                </tr>
              </tbody>

              ))}
            </table>
          </div>
        </div>
        <div className="current-booking-bottom">
          <button className='current-booking-go-back' onClick={() => history.goBack()}>Go Back</button>
        </div>
      </div>
    </div>
  );
}

export default CurrentBookings;
