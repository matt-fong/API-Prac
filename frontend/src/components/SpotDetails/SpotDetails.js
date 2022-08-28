import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getReviewsBySpotId } from "../../store/reviews";
import './SpotDetails.css'
import { getAllSpots } from "../../store/spots";

const SpotDetails = () => {
  // const spots = useSelector((state) => Object.values(state.spots));
  // const { spotId } = useParams();
  // const spot = spots.find((spot) => spot.id == spotId);

  const [isLoaded, setIsLoaded] = useState(false);

  const spots = useSelector((state) => (state.spots));
  const { spotId } = useParams();
  const spot = spots[spotId]

  // console.log('THIS IS SPOTS', spots)
  console.log('THIS IS SPOT', spot)
  // console.log('THIS IS SPOTID', spotId)

  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getAllSpots()).then(() => setIsLoaded(true));
    dispatch(getReviewsBySpotId(spotId))
  }, []);

  const reviews = useSelector((state) => Object.values(state.reviews));
  console.log('THIS IS REVIEWS', reviews)

  const handleCreateReview = (e) => {
    e.preventDefault();
    let path = `/spots/${spotId}/create-review`;

    if (sessionUser) {
      history.push(path);
    }
  };


  if (!isLoaded) {
    return null
  }

  return (
    <div className='spotDetailContainer'>
      <div className="spotDetailInnerContainer">


        <div className='spotDetailHeaderContainer'>
          <h1 className='spotDetailName'>{spot.name}</h1>
          <div className='spotDetailContainer'>
            <div className="spotDetailInfo">
              <i className="fa-solid fa-star"></i>
              {spot.avgRating} {` · `} {reviews.length} {`reviews`}
              <div className="spotDetailNumReview"></div>
              {` · `}
              <div className="spotDetailLocation">{spot.city}, {spot.state}, {spot.country}</div>
            </div>
          </div>
        </div>


        <div className='spotDetailPicture'>
          <img className='spotDetailImage' src={spot.previewImage} />
        </div>


        <div className='spotDetailBodyContainer'>
          <div className='spotDetailDescription'>
            {spot.description}
          </div>
          <div className='spotDetailPriceContainer'>
            <div className="spotDetailPrice">
              <div className='spotPriceAmount'>{`$${spot.price}`}</div>
              <div className='spotNight'>night</div>
            </div>
            <div className="spotDetailReview">
              <i className="fa-solid fa-star"></i>
              {spot.avgRating} {` · `} {reviews.length} {`reviews`}
            </div>
          </div>
        </div>

        <div className="spotDetailReviewContainer">
          <div className="spotDetailReviewHeader">
            <div className="spotDetailBottomReview"><i className="fa-solid fa-star">{spot.avgRating}</i></div>
            <div>
              <button className="createReviewButton" onClick={handleCreateReview}>Create Review</button>
            </div>
          </div>

          <div className="spotDetailReviews">
            REVIEWS:
            {reviews.map((review, i) => (
              <div key={review.id} review={review}>Review {i + 1}: {''}
              <i className="fa-solid fa-star"></i>{review.stars} {review.review}</div>
            ))}
          </div>
        </div>


      </div>
    </div>
  )
}

export default SpotDetails;
