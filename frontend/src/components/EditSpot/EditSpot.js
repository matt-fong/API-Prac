import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import "./EditSpot.css";
import { editSpot } from "../../store/spots";

function EditSpotForm() {
  const spots = useSelector((state) => Object.values(state.spots));
  const { spotId } = useParams();
  const spot = spots.find((spot) => spot.id == spotId);

  const [address, setAddress] = useState(spot.address);
  const [city, setCity] = useState(spot.city);
  const [state, setState] = useState(spot.state);
  const [country, setCountry] = useState(spot.country);
  const [lat, setLat] = useState(spot.lat);
  const [lng, setLng] = useState(spot.lng);
  const [name, setName] = useState(spot.name);
  const [description, setDescription] = useState(spot.description);
  const [price, setPrice] = useState(spot.price);
  const [errors, setErrors] = useState([]);

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

    const data = {};
    if (spot.name) spot.name = name;
    if (price) spot.price = price;
    if (lat) spot.lat = lat;
    if (lng) spot.lng = lng;
    if (description) spot.description = description;
    if (address) spot.address = address;
    if (city) spot.city = city;
    if (state) spot.state = state;
    if (country) spot.country = country;

    setErrors([]);
    // return dispatch(editSpot(data, spot.id)).catch(async (res) => {
    //   console.log("Res:", res);
    //   const data = await res.json();
    //   if (data && data.errors) setErrors(data.errors);
    // });
  };

  return (
    <form onSubmit={onSubmit}>
      <ul className="spot_error">
        {Object.values(errors).map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <div className="spot-input-item">
        <input
          placeholder="Spot Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="spot-input-item">
        <input
          placeholder="Description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="spot-input-item">
        <input
          placeholder="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div className="spot-input-item">
        <input
          placeholder="Address"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div className="spot-input-item">
        <input
          placeholder="City"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
      <div className="spot-input-item">
        <input
          placeholder="State"
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
      </div>
      <div className="spot-input-item">
        <input
          placeholder="Country"
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
      </div>
      <div className="spot-input-item">
        <input
          placeholder="Latitude"
          type="number"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
        />
      </div>
      <div className="spot-input-item">
        <input
          placeholder="Longitude"
          type="number"
          value={lng}
          onChange={(e) => setLng(e.target.value)}
        />
      </div>
      {/* <div className="spot-input-item">
        <input
          placeholder="Spot Image"
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}

        />
      </div> */}
      <button className="spot-modal-submit" type="submit">
        Edit Spot
      </button>
    </form>
  );
}

export default EditSpotForm;
