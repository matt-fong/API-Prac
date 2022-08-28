import { useDispatch, useSelector } from "react-redux";
import { deleteReviewById } from "../../store/reviews";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./ReviewCard.css";
import { getAllSpots } from "../../store/spots";
import { getReviewsByCurrentUser } from "../../store/reviews";

function ReviewCard({ review }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const createdAt = review?.createdAt;
  const date = new Date(createdAt).toLocaleDateString(undefined, {
    month: "long",
    year: "numeric",
  });

  let owner;

  const sessionUser = useSelector((state) => state.session.user);
  if (sessionUser && review) {
    owner = sessionUser.id === review.userId;
  }

  const handleDelete = () => {
    dispatch(deleteReviewById(review.id, review.spotId));
  };

  useEffect(() => {
    dispatch(getReviewsByCurrentUser())
    dispatch(getAllSpots())
  }, []);

  return (
    <div className="reviewCardContainer">
      <div className="reviewCardData">

        <div className="reviewCardDataLeft">
          <div className="reviewCardUserPic">
            <i className="fas fa-user-circle fa-2xl" />
          </div>

          <div className="reviewCardNameStar">

            <div className='reviewCardStar'>
              <i className="fa-solid fa-star"></i>
              <div className='reviewCardRating'>{review.stars}</div>
            </div>

            <div className="reviewCardName">{review?.User?.firstName}</div>

          </div>

        </div>

        <div className="reviewCardDataRight">
          {owner && (
          <div>
            <button onClick={() => history.push(`/reviews/${review.id}`)}>Edit Review</button>
          </div>
          )}
        </div>
      </div>
      <div className="reviewCardDate">{date}</div>
      <div className="reviewCardReview">
        <div className="review">{review?.review}</div>
        <div className="reviewCardDataRight">
          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default ReviewCard;
