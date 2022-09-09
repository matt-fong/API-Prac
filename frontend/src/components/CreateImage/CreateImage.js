import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import './CreateImage.css'
import { getAllSpots } from "../../store/spots";
import { createImageBySpotId } from "../../store/images";
import { deleteImageById } from "../../store/images";

const CreateImage = ({ onX }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  let { spotId } = useParams();
  const { ownerId } = useParams()

  spotId = Number(spotId);

  const sessionUser = useSelector(state => state.session.user);
  const reviews = useSelector((state) => Object.values(state.reviews));
  const userReview = reviews.find((review) => review.userId === sessionUser.id)

  const [url, setUrl] = useState("");
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState([]);

  // useEffect(() => {
  //   dispatch(getAllSpots())
  // }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    let data = {
      url: url,
    };

    // dispatch(deleteImageById(44))

    dispatch(createImageBySpotId(spotId, data))
    onX()

  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="createImageErrorContainer">
          <ul>
            {Object.values(errors).map((error, i) => (
              <li className="createImageError" key={i}>{error}</li>
            ))}
          </ul>
        </div>
        <div className="createImageInputContainer">
          <div className="createImageInput">
            <input className="createImageInputText"
              type="text"
              placeholder="Url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              // required
            />
          </div>

          <button className="createImageSubmit" type="submit">Create Image</button>
          <button className="createImageSubmit" onClick={() => { onX() }}>Go Back</button>
        </div>
      </form>
    </>
  );
};

export default CreateImage;
