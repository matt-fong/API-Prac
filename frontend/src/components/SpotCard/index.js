import { Link } from 'react-router-dom'
import './SpotCard.css'

const SpotCard = ({ spot }) => {
  return (
    <Link className='spotCardContainer' to={`/spots/${spot.id}`}>
      <div className='spotCardContainer'>
        <img className='spotImage' src={spot.previewImage} />
        <div className='spotDescription'>
          <div className='spotDescriptionLeft'>
            <div className='spotLocation'>{spot.city}, {spot.state}</div>
            <div className='spotPrice'>{`$${spot.price} night`}</div>
          </div>
          <div className='spotDescriptionRight'>
            <div className='spotRating'>
              <i class="fa-solid fa-star"></i>
              <div className='spotRatingNumber'>{spot.avgRating}</div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default SpotCard;
