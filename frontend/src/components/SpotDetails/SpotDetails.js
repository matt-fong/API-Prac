import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getReviews, createReview } from "../../store/reviews";
import { getSpotById } from "../../store/spots";
import { getReviewsBySpotId } from "../../store/reviews";

const SpotDetails = () => {
  const spots = useSelector((state) => Object.values(state.spots));
  const { spotId } = useParams();
  const spot = spots.find((spot) => spot.id == spotId);

  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(getSpotById(spotId));
    dispatch(getReviewsBySpotId(spotId));
  }, []);

  const reviews = useSelector((state) => Object.values(state.reviews));
  console.log('THIS IS REVIEWS', reviews)

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
