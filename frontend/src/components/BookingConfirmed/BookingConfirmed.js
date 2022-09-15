import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getBookingsByCurrentUser } from "../../store/bookings"
import { getAllUsers } from "../../store/users";
import './BookingConfirmed.css'

const BookingConfirmed = ({ setStartDate, setEndDate, todayDate, startDate, endDate }) => {
  const { spotId } = useParams();
  const { bookingId } = useParams();
  console.log('THIS IS SPOTID', spotId)
  console.log('THIS IS BOOKINGID', bookingId)

  const spots = useSelector((state) => (state.spots));

  const spot = spots[spotId]
  console.log('THIS IS SPOT', spot)

  const users = useSelector(state => (state.users));
  // console.log('THIS IS USERS', users)

  const spotOwner = users[spot?.ownerId]
  // console.log('THIS IS SPOTOWNER', spotOwner)

  const sessionUser = useSelector(state => state.session.user);

  const dispatch = useDispatch();
  const history = useHistory();

  const bookings = useSelector(state => (state.bookings));
  // console.log('THIS IS BOOKINGS', bookings)
  const currentBooked = bookings[bookingId]
  // console.log('THIS IS CURRENT BOOKED', currentBooked)

  const startDateNum = new Date(startDate) - 0
  const endDateNum = new Date(endDate) - 0

  useEffect(() => {
    dispatch(getBookingsByCurrentUser())
    dispatch(getAllUsers())
    // dispatch(getBookingsBySpotId(spotId))
  }, [ startDateNum, endDateNum ]);

  const startInt = new Date(currentBooked?.startDate).getDay()
  // console.log('THIS IS startInt', startInt )

  const endInt = new Date(currentBooked?.endDate).getDay()
  // console.log('THIS IS endInt', endInt )

  const monthIntend = new Date(currentBooked?.endDate).getMonth()
  console.log('THIS IS monthIntend', monthIntend )

  const monthIntstart = new Date(currentBooked?.startDate).getMonth()
  console.log('THIS IS monthIntstart', monthIntstart )

  let dateDiffInt;

  if (isNaN((new Date(currentBooked?.endDate) - new Date(currentBooked?.startDate)) / 86400000) || ((new Date(currentBooked?.endDate) - new Date(currentBooked?.startDate)) / 86400000) < 0) {
    dateDiffInt = 0;
  } else {
    dateDiffInt = (new Date(currentBooked?.endDate) - new Date(currentBooked?.startDate)) / 86400000
  }

  const weekday = (day) => {
    if (day === 6) return 'Sun'
    if (day === 0) return 'Mon'
    if (day === 1) return 'Tue'
    if (day === 2) return 'Wed'
    if (day === 3) return 'Thu'
    if (day === 4) return 'Fri'
    if (day === 5) return 'Sat'
  }

  return (
    <div className="booking-confirmed-container">
      <div className="booking-confirmed-inner-container">

        <div className="booking-confirmed-image-container">
          <img className="booking-confirmed-image" src={spot?.previewImage}></img>
        </div>

        <div className="booking-confirmed-information-container">

          <div className="booking-confirmed-checkin-checkout-container">
            <div className="booking-confirmed-check-container">

              <div className="booking-confirmed-checkin-container">
                <div className="booking-confirmed-checkin">Check-in</div>
                <div className="booking-confirmed-checkin-date">{`${weekday(startInt)}, ${currentBooked?.startDate}`}</div>
                <div className="booking-confirmed-checkin-time">4:00PM</div>
              </div>

              <div className="booking-confirmed-checkout-container">
                <div className="booking-confirmed-checkout">Checkout</div>
                <div className="booking-confirmed-checkout-date">{`${weekday(endInt)}, ${currentBooked?.endDate}`}</div>
                <div className="booking-confirmed-checkout-time">11:00AM</div>
              </div>

            </div>
          </div>

          <div className="booking-confirmed-details-container">

            <div className="booking-confirmed-reservation-details-container">
              <div className="booking-confirmed-reservation-details">Reservation Details</div>
              <div className="booking-confirmed-who-coming">Who's coming</div>
              <div className="booking-confirmed-guests">2 guests</div>
            </div>

            <div className="test"></div>

            <div className="booking-confirmed-getting-there-container">
              <div className="booking-confirmed-getting-there">Getting there</div>
              <div className="booking-confirmed-address">Address</div>
              <div className="booking-confirmed-address-info-top">{spot?.address}</div>
              <div className="booking-confirmed-address-info-bottom">{spot?.city}, {spot?.state}</div>
            </div>

            <div className="test"></div>

            <div className="booking-confirmed-staying-container">
              <div className="booking-confirmed-where-staying">Where you're staying</div>
              <div className="booking-confirmed-house-rules">House Rules</div>
              <div className="booking-confirmed-house-rules-info">No smoking, no drugs, no parties allowed. Do not disturb your neighbors. Do not break anything. If there are any issues, please reach out to me directly.</div>
            </div>

            <div className="test"></div>

            <div className="booking-confirmed-hosted-by-container">
              <div className="booking-confirmed-hosted-by">Hosted by {spotOwner?.firstName}</div>
              <div className="booking-confirmed-host-about">About your host</div>
              <div className="booking-confirmed-host-about-info">I love traveling a lot on Airdnd. Being a traveler that has used Airdnd has made me more interested in becoming a host. I hope you enjoy your Airdnd stay!</div>
              <div className="booking-confirmed-host-profile">Show Profile</div>
            </div>

            <div className="test"></div>

            <div className="booking-confirmed-payment-info-container">
            <div className="booking-confirmed-payment-info">Payment info </div>
              <div className="booking-confirmed-payment-details">Payment details </div>
              <div className="booking-confirmed-total-cost">{`Total cost: $${dateDiffInt * spot?.price} USD`}</div>
            </div>

          </div>



        </div>


      </div>
    </div>
  );
}

export default BookingConfirmed;
