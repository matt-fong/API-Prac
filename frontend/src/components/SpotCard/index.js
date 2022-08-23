import { Link } from 'react-router-dom'
import './SpotCard.css'

const SpotCard = ({ spot }) => {
  return (
    <Link className='spotCardContainer' to={`/spots/${spot.id}`}>
      <div className='spotCardContainer'>
        <img className='spotImage' src={spot.previewImage} />
        <div className='spotDescription'>{spot.name}</div>
      </div>
    </Link>
  )
}

export default SpotCard;
