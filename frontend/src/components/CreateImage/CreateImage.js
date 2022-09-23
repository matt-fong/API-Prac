import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import './CreateImage.css'
import { getAllSpots } from "../../store/spots";
import { createImageBySpotId } from "../../store/images";

const CreateImage = ({ onX }) => {
  const dispatch = useDispatch();
  let { spotId } = useParams();

  spotId = Number(spotId);

  const sessionUser = useSelector(state => state.session.user);

  const [url, setUrl] = useState("");
  const [errors, setErrors] = useState([]);

  // useEffect(() => {
  //   dispatch(getAllSpots())
  // }, []);

  function isImage(url) {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url)
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    let data = {
      url: url,
    };

    if (!isImage(url)) {
      setErrors({ error: "Must be a valid image: jpg, jpeg, png, webp, avif, gif, svg " })
    }

    if (!sessionUser) {
      setErrors({ error: "User must be logged in." })
    }

    if (isImage(url) && sessionUser) {
      dispatch(createImageBySpotId(spotId, data)).then(() => dispatch(getAllSpots()))
      onX()
    }

  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="createImageErrorContainer">
          <div>
            {Object.values(errors).map((error, i) => (
              <div className="createImageError" key={i}>{error}</div>
            ))}
          </div>
        </div>
        <div className="createImageInputContainer">
          <div className="createImageInput">
            <input className="createImageInputText"
              type="text"
              placeholder="Image-URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </div>

          <button className="createImageSubmit" type="submit">Create Image</button>
          {/* <button className="createImageSubmit" onClick={() => { onX() }}>Go Back</button> */}
        </div>
      </form>
    </>
  );
};

export default CreateImage;
