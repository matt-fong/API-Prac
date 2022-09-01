import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getReviewsBySpotId } from "../../store/reviews";
import './SpotDetails.css'
import { getAllSpots } from "../../store/spots";
import ReviewCard from "../ReviewCard/ReviewCard";
import { getAllUsers } from "../../store/users";
import UserBookings from "../UserBookings/UserBookings";

const SpotDetails = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoadedd, setIsLoadedd] = useState(false);

  const { spotId } = useParams();
  const spots = useSelector((state) => (state.spots));
  const spot = spots[spotId]

  console.log('THIS IS SPOTS', spots)

  const sessionUser = useSelector(state => state.session.user);
  const users = useSelector(state => (state.users));

  const { ownerId } = useParams()
  // console.log('THIS IS OWNERID', ownerId)

  const spotOwner = users[ownerId]
  console.log('THIS IS SPOT OWNER', spotOwner)

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getAllSpots()).then(() => setIsLoaded(true));
    dispatch(getReviewsBySpotId(spotId)).then(() => setIsLoadedd(true))
    dispatch(getAllUsers())
  }, []);

  const reviews = useSelector((state) => Object.values(state.reviews));

  const handleCreateReview = (e) => {
    e.preventDefault();
    let path = `/spots/${spotId}/${ownerId}/create-review`;

    if (sessionUser) {
      history.push(path);
    }
  };

  // const date = new Date().toLocaleDateString(undefined, {
  //   month: "short",
  //   // year: "numeric",
  //   day: 'numeric'
  // });

  // date.setDate(20)

  // console.log(date)

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
                <div className="spotDetailHostedBy">Entire home hosted by {spotOwner.firstName}{' '}{spotOwner.lastName}</div>
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

            <div className='spotDetailHighlightContainer'>

              <div className="spotDetailHighlightOne">
                <i class="fa-solid fa-door-open fa-xl spot-detail-icons"></i>
                <div className="selfCheckout">
                  <div className="spotDetailHighlightUppertext">Self check-in</div>
                  <div className="spotDetailHighlightUndertext">Check yourself in with the keypad.</div>
                </div>
              </div>

              <div className="spotDetailHighlightTwo">
                <i className="fa-solid fa-medal fa-xl spot-detail-icons"></i>
                <div>
                  <div className="spotDetailHighlightUppertext">{`${spotOwner.firstName} is a Superhost`}</div>
                  <div className="spotDetailHighlightUndertext">Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.</div>
                </div>
              </div>

              <div className="spotDetailHighlightThree">
                <i className="fa-solid fa-calendar fa-xl spot-detail-icons"></i>
                <div>
                  <div className="spotDetailHighlightUppertext">Free cancellation for 48 hours.</div>
                  {/* <div className="spotDetailHighlightUndertext">undertext</div> */}
                </div>
              </div>

            </div>

            <div className="spotDetailDescription">{spot.description}</div>
          </div>


          <div className="spotDetailBodyRight">

            <div className='spotDetailPriceContainer'>

              <div className="spotDetailBoxOne">
                <div className="spotDetailPrice">
                  <div className='spotPriceAmount'>{`$${spot.price}`}</div>
                  <div className='spotNight'>night</div>
                </div>
                <div className="spotDetailReview">
                  <i className="fa-solid fa-star"></i>
                  {spot.avgRating} {` · `} {reviews.length} {`reviews`}
                </div>
              </div>

              <div className="spotDetailBoxTwo">
                Bookings
                  {/* <div>{<UserBookings />}</div> */}
              </div>

              <div className="spotDetailBoxThree">
                You won't be charged yet
              </div>

              <div className="spotDetailBoxFour">
                <div className="spotDetailFeeOne">
                  <div className="spotDetailFeeDescription">$100 x 7 nights</div>
                  <div className="spotDetailFeeNumber">$700</div>
                </div>
                <div className="spotDetailFeeTwo">
                  <div className="spotDetailFeeDescription">Cleaning fee</div>
                  <div className="spotDetailFeeNumber">Free</div>
                </div>
                <div className="spotDetailFeeThree">
                  <div className="spotDetailFeeDescription">Service fee</div>
                  <div className="spotDetailFeeNumber">Free</div>
                </div>
              </div>

              <div className="spotDetailBoxFive">
                <div className='spotDetailTotalDescription'>Total before taxes</div>
                <div className='spotDetailTotalPrice'>$700</div>
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
