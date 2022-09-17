import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
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

  const user = useSelector(state => state.session.user);

  const dispatch = useDispatch();
  const history = useHistory();

  function isImage(url) {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url)
  }
  const LAT = 123.121212;
  const LNG = -321.121212;

  const onSubmit = (e) => {
    e.preventDefault();

    setErrors([]);

    let data = {
      address: address,
      city: city,
      state: state,
      country: country,
      lat: LAT,
      lng: LNG,
      name: name,
      description: description,
      price: price,
      url: url,
      previewImage: true
    };

    if (!isImage(url)) {
      setErrors({ error: "Must be a valid image: jpg, jpeg, png, webp, avif, gif, svg " })
    }

    if (!user) {
      setErrors({ error: "User must be logged in." })
    }

    if (isImage(url) && user) {
      dispatch(spotActions.createSpot(data)).then((res) => history.push(`/spots/${res.id}/${user.id}`))
      onX()
      // history.push('/my-spots')
    }

  };

  return (
    <form className="createSpotForm" onSubmit={onSubmit}>
      <div className="createSpotErrorContainer">
        <ul>
          {Object.values(errors).map((error, i) => (
            <li className="createSpotError" key={i}>{error}</li>
          ))}
        </ul>
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
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="createSpotInput">
          <input className="createSpotInputText"
            type="text"
            placeholder="Image-Url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </div>
        <button className="createSpotSubmit" type="submit">
          Create New Spot
        </button>
      </div>
    </form>
  )
}

export default CreateSpot;
