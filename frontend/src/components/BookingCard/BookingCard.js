import { Link } from 'react-router-dom'
import './BookingCard.css'

const BookingCard = ({ booking }) => {

  console.log('this is booking', booking)

  return (
    <Link className='bookingCardContainer' to={`/spots/${booking.Spot.id}/${booking.Spot.ownerId}`}>
      <div className='bookingCardContainer'>
        <img className='bookingImage' src={booking.Spot.previewImage} />
        <div className='bookingDescription'>
          <div className='bookingDescriptionLeft'>
            <div className='bookingLocation'>{booking.Spot.city}, {booking.Spot.state}</div>
            <div className='bookingCountry'>{booking.Spot.country}</div>
            {/* <div className='bookingPrice'>
              <div className='bookingCardPriceAmount'>{`$${booking.Spot.price}`}</div>
              <div className='bookingCardNight'>night</div>
            </div> */}
            <div>{booking.startDate}</div>
            <div>{booking.endDate}</div>
          </div>
          <div className='bookingDescriptionRight'>
            {/* <div className='bookingStar'>
              <i className="fa-solid fa-star"></i>
            </div>
            <div className='bookingRating'>{booking.Spot.avgRating}</div> */}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default BookingCard;
