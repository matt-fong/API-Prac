import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getReviewsByCurrentUser } from "../../store/reviews";
import { getAllUsers } from "../../store/users";
import './UserProfile.css'

const UserProfile = () => {
  const { spotId } = useParams();
  const { bookingId } = useParams();
  const { userId } = useParams()

  const reviews = useSelector(state => Object.values(state.reviews));
  // console.log('THIS IS REVIEWS', reviews)

  const spots = useSelector((state) => (state.spots));

  const spot = spots[spotId]
  // console.log('THIS IS SPOT', spot)

  const users = useSelector(state => (state.users));
  const currentUser = users[userId]
  // console.log('THIS IS USERS', users)

  const spotOwner = users[spot?.ownerId]
  // console.log('THIS IS SPOTOWNER', spotOwner)

  const dispatch = useDispatch();

  const bookings = useSelector(state => (state.bookings));
  // console.log('THIS IS BOOKINGS', bookings)
  const currentBooked = bookings[bookingId]
  // console.log('THIS IS CURRENT BOOKED', currentBooked)

  useEffect(() => {
    dispatch(getReviewsByCurrentUser())
    dispatch(getAllUsers())
  }, [ dispatch ]);


  return (
    <div className="account-page-container">
      <div className="account-page-inner-container">

        <div className="account-page-left-side-container">
          <div className="account-page-user-info-container">

            <div className="account-page-user-info-one">
              <img className='account-page-user-info-pic' src='https://www.seekpng.com/png/full/73-730482_existing-user-default-avatar.png' alt='Owner Icon'></img>
              <div className="account-page-user-info-name">{`${currentUser?.firstName} ${currentUser?.lastName}`}</div>
            </div>

            <div className="account-page-user-info-two">
              <i class="fa-regular fa-star fa-xl account-page-star"></i>
              <div className="account-page-user-info-review">{`${reviews?.length} reviews`}</div>
            </div>

            <div className="account-page-user-info-three">
              <i class="fa-solid fa-square-check fa-xl account-page-check"></i>
              <div className="account-page-user-info-identity">Identity Verified</div>
            </div>

            <div className="account-page-user-info-four"></div>

            <div className="account-page-user-info-five">

              <div className="account-page-user-info-bottom-header">{`${currentUser?.firstName} confirmed`}</div>

              <div className="account-page-user-info-bottom">
                <i class="fa-solid fa-check fa-lg account-page-bottom-check"></i>
                <div className="account-page-user-info-detail">Identity</div>
              </div>

              <div className="account-page-user-info-bottom">
                <i class="fa-solid fa-check fa-lg account-page-bottom-check"></i>
                <div className="account-page-user-info-detail">Phone Number</div>

              </div>

            </div>

          </div>
        </div>

        <div className="account-page-right-side-container">
          <div className="account-page-right-side-header">{`Hi, I'm ${currentUser?.firstName}`}</div>
          <div className="account-page-right-side-text">Random text</div>
          <div className="account-page-right-side-etc">Random text</div>
        </div>

      </div>
    </div>
  );
}

export default UserProfile;
