import { useDispatch, useSelector } from "react-redux";
import "./ReviewCard.css";

function ReviewCard({ review }) {
  const dispatch = useDispatch();

  const createdAt = review?.createdAt;
  const date = new Date(createdAt).toLocaleDateString(undefined, {
    month: "long",
    year: "numeric",
  });

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
        </div>
      </div>
      <div className="reviewCardDate">{date}</div>
      <div className="reviewCardReview">
        <div className="review">{review?.review}</div>

      </div>
    </div>
  );
}

export default ReviewCard;
