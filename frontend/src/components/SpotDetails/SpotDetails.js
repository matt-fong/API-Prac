import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const SpotDetails = () => {
  const spots = useSelector((state) => Object.values(state.spots));
  const { spotId } = useParams();
  const spot = spots.find((spot) => spot.id == spotId);

  return (
    <div className='spotDetailContainer'>
      <div className='spotDetailHeader'>
        <h1 className='spotDetailName'>{spot.name}</h1>
        <div className='spotDetailReview'>
          <i className="fa-solid fa-star">{spot.avgRating}</i>
        </div>
        <div className='spotDetailAddress'>{spot.city}, {spot.state}, {spot.country}</div>
      </div>
      <div className='spotDetailPicture'>
        <img className='spotDetailImage' src={spot.previewImage} />
      </div>
      <div className='spotDetailBody'>

      </div>
    </div>
  )
}

export default SpotDetails;
