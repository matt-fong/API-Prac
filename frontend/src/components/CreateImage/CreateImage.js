import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import './CreateImage.css'
import { getAllSpots } from "../../store/spots";
import { createImageBySpotId } from "../../store/images";

const CreateImage = ({ onX }) => {
  const dispatch = useDispatch();
  let { spotId } = useParams();

  spotId = Number(spotId);

  // const [url, setUrl] = useState("");
  const [errors, setErrors] = useState([]);
  const [image, setImage] = useState(null);

  function isImage(url) {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url)
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    let data = {
      // url: url,
      image: image,
    };

    let errors = [];

    if (!image) {
      errors.push( "Image must be uploaded." )
    }

    if (image && !isImage(image?.name)) {
      errors.push( "Must be a valid image: jpg, jpeg, png, webp, avif, gif, svg" )
    }

    setErrors(errors)

    if (isImage(image?.name)) {
      dispatch(createImageBySpotId(spotId, data)).then(() => dispatch(getAllSpots()))
      onX()
    }

  };

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="createImageErrorContainer">
          <div className="createImageError">
            {(errors).map((error, i) => (
              <div className="errorMessageContainer" key={i}>
                <i class="fa-solid fa-exclamation exclamation-point"></i>
                <div className="errorMessage">{error}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="createImageInputContainer">
          {/* <div className="createImageInput">
            <input className="createImageInputText"
              type="text"
              placeholder="Image-URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </div> */}

        <label>
          <input type="file" onChange={updateFile} />
        </label>

          <button className="createImageSubmit" type="submit">Add Image</button>
          {/* <button className="createImageSubmit" onClick={() => { onX() }}>Go Back</button> */}
        </div>
      </form>
    </>
  );
};

export default CreateImage;
