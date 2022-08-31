import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getReviewsBySpotId } from "../../store/reviews";
import './SpotDetails.css'
import { getAllSpots } from "../../store/spots";
import ReviewCard from "../ReviewCard/ReviewCard";

const SpotDetails = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoadedd, setIsLoadedd] = useState(false);

  const spots = useSelector((state) => (state.spots));
  const { spotId } = useParams();
  const spot = spots[spotId]

  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getAllSpots()).then(() => setIsLoaded(true));
    dispatch(getReviewsBySpotId(spotId)).then(() => setIsLoadedd(true))
  }, []);

  const reviews = useSelector((state) => Object.values(state.reviews));

  const handleCreateReview = (e) => {
    e.preventDefault();
    let path = `/spots/${spotId}/create-review`;

    if (sessionUser) {
      history.push(path);
    }
  };

  if (!isLoaded) return null
  if (!isLoadedd) return null

  let sessionLinks;

  if (sessionUser) {
    sessionLinks = (
      <div className='spotDetailCreateReview'>
        <button className="createReviewButton" onClick={handleCreateReview}>Add review</button>
      </div>
    );
  }

  return (
    <div className='spotDetailContainer'>
      <div className="spotDetailInnerContainer">


        <div className='spotDetailHeaderContainer'>
          <div className='spotDetailName'>{spot.name}</div>
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
          <div className='spotDetailListing'>

            <div className='spotDetailHostContainer'>

              <div className="spotDetailHostLeft">
                <div className="spotDetailHostedBy">Entire home hosted by {sessionUser.firstName}{' '}{sessionUser.lastName}</div>
                <div className="spotDetailSpecs">
                  <div className="spotDetailSpecsGuest">2 guests</div>
                  <div className="spotDetailSpecsBedroom">{` · `}1 bedroom</div>
                  <div className="spotDetailSpecsBed">{` · `}1 bed</div>
                  <div className="spotDetailSpecsBath">{` · `}1 bath</div>
                </div>
              </div>

              <div className="spotDetailHostRight">
                <img className='spotDetailOwnerIcon' src='https://www.seekpng.com/png/full/73-730482_existing-user-default-avatar.png'></img>
              </div>

            </div>

            <div className="spotDetailDescription">{spot.description}</div>
          </div>
          <div className="spotDetailBodyRight">
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
        </div>

        <div className="spotDetailReviewContainer">
          <div className="spotDetailReviewHeader">
            <div className="spotDetailReviewInfo">
              <i className="fa-solid fa-star"></i>
              {spot.avgRating} {` · `} {reviews.length} {`reviews`}
            </div>
          </div>

          <div className="spotDetailReviewName">Reviews</div>

          <div>{sessionLinks}</div>

          <div className="spotDetailReviewCards">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SpotDetails;
