import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as spotActions from "../../store/spots";
import './CreateSpotModal.css'

const CreateSpot = ({ onX }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(null);
  // const [lat, setLat] = useState(null);
  // const [lng, setLng] = useState(null);
  const [url, setUrl] = useState(null);
  const [errors, setErrors] = useState([]);
  const [image, setImage] = useState(null);

  const user = useSelector(state => state.session.user);

  const dispatch = useDispatch();
  const history = useHistory();

  function isImage(url) {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url)
  }

  const LAT = 123.121212;
  const LNG = -321.121212;

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    let errors = [];

    let data = {
      name: name,
      address: address,
      city: city,
      state: state,
      country: country,
      description: description,
      price: price,
      // url: url,
      image: image,
      lat: LAT,
      lng: LNG,
      previewImage: true
    };


    if (!user) {
      errors.push( "User must be logged in." )
      setErrors(errors)
    } else {
      if (!isImage(image?.name)) {
        errors.push( "Must be a valid image: jpg, jpeg, png, webp, avif, gif, svg " )
      }

      if (name.length < 5 || name.length > 255) {
        errors.push( "Name must be between 5 to 255 characters." )
      }

      if (address.length < 5 || address.length > 255) {
        errors.push( "Address must be between 5 to 255 characters." )
      }

      if (city.length < 5 || city.length > 255) {
        errors.push( "City must be between 5 to 255 characters." )
      }

      if (state.length < 5 || state.length > 255) {
        errors.push( "State must be between 5 to 255 characters." )
      }

      if (country.length < 5 || country.length > 255) {
        errors.push( "Country must be between 5 to 255 characters." )
      }

      if (description.length < 5 || description.length > 255) {
        errors.push( "Description must be between 5 to 255 characters." )
      }

      setErrors(errors)
    }

    if (isImage(image?.name)
      && user
      && (name.length >= 5 && name.length <= 255)
      && (address.length >= 5 && address.length <= 255)
      && (city.length >= 5 && city.length <= 255)
      && (state.length >= 5 && state.length <= 255)
      && (country.length >= 5 && country.length <= 255)
      && (description.length >= 5 && description.length <= 255)
      ) {

      return dispatch(spotActions.createSpot(data)).then((res) => history.push(`/spots/${res.id}/${user.id}`)).then(() => onX()).catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        }
      );
    }

  };

  return (
    <form className="createSpotForm" onSubmit={onSubmit}>
      <div className="createSpotErrorContainer">
        <div className="createSpotError">
          {(errors).map((error, i) => (
            <div className="errorMessageContainer" key={i}>
              <i class="fa-solid fa-exclamation exclamation-point"></i>
              <div className="errorMessage">{error}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="createSpotInputContainer">
        <div className="createSpotInput">
          <input className="createSpotInputText"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="createSpotInput">
          <input className="createSpotInputText"
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="createSpotInput">
          <input className="createSpotInputText"
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div className="createSpotInput">
          <input className="createSpotInputText"
            type="text"
            placeholder="State"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
        </div>
        <div className="createSpotInput">
          <input className="createSpotInputText"
            type="text"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </div>
        {/* <div className="createSpotInput">
          <input className="createSpotInputText"
            type="number"
            placeholder="Latitude"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            required
          />
        </div>
        <div className="createSpotInput">
          <input className="createSpotInputText"
            type="number"
            placeholder="Longitude"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
            required
          />
        </div> */}
        <div className="createSpotInput">
          <input className="createSpotInputText"
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="createSpotInput">
          <input className="createSpotInputText"
            type="number"
            placeholder="$ Price"
            value={price}
            min={1}
            max={9999}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        {/* <div className="createSpotInput">
          <input className="createSpotInputText"
            type="text"
            placeholder="Image-Url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </div> */}

        <label>
          <input type="file" onChange={updateFile} />
        </label>

        <button className="createSpotSubmit" type="submit">
          Create New Spot
        </button>
      </div>
    </form>
  )
}

export default CreateSpot;
