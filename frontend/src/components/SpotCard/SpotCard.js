import { Link } from 'react-router-dom'
import './SpotCard.css'

const SpotCard = ({ spot }) => {

  return (
    <Link className='spotCardContainer' to={`/spots/${spot.id}/${spot.ownerId}`}>
      <div className='spotCardContainer'>
        <img className='spotImage' src={spot?.Images?.[0]?.url} />
        <div className='spotDescription'>
          <div className='spotDescriptionLeft'>
            <div className='spotLocation'>{spot.city}, {spot.state}</div>
            <div className='spotCountry'>{spot.country}</div>
            <div className='spotPrice'>
              <div className='spotCardPriceAmount'>{`$${spot.price}`}</div>
              <div className='spotCardNight'>night</div>
            </div>
          </div>
          <div className='spotDescriptionRight'>
            <div className='spotStar'>
              <i className="fa-solid fa-star"></i>
            </div>
            <div className='spotRating'>{spot.avgRating}</div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default SpotCard;
