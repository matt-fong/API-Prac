import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams, useHistory } from "react-router-dom";
import "./EditSpot.css";
import { editSpot } from "../../store/spots";

function EditSpotForm() {
  const spots = useSelector((state) => Object.values(state.spots));
  const { spotId } = useParams();
  const spot = spots.find((spot) => spot.id == spotId);

  const [name, setName] = useState(spot?.name);
  const [price, setPrice] = useState(spot?.price);
  const [lat, setLat] = useState(spot?.lat);
  const [lng, setLng] = useState(spot?.lng);
  const [description, setDescription] = useState(spot?.description);
  const [address, setAddress] = useState(spot?.address);
  const [city, setCity] = useState(spot?.city);
  const [state, setState] = useState(spot?.state);
  const [country, setCountry] = useState(spot?.country);
  const [url, setUrl] = useState('');
  const [errors, setErrors] = useState([]);

  const dispatch = useDispatch();
  const history = useHistory()

  const onSubmit = (e) => {
    e.preventDefault();

    const data = {};
    if (name) data.name = name;
    if (price) data.price = price;
    if (lat) data.lat = lat;
    if (lng) data.lng = lng;
    if (description) data.description = description;
    if (address) data.address = address;
    if (city) data.city = city;
    if (state) data.state = state;
    if (country) data.country = country;
    if (url) data.url = url;

    setErrors([]);
    dispatch(editSpot(data, spot.id)).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });

    history.push('/')

  };

  return (
    <>
    <div>Edit Form</div>
    <form onSubmit={onSubmit}>
      <ul>
        {Object.values(errors).map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <div>
        <input
          placeholder="Spot Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <input
          placeholder="Description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <input
          placeholder="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div>
        <input
          placeholder="Address"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div>
        <input
          placeholder="City"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
      <div>
        <input
          placeholder="State"
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
      </div>
      <div>
        <input
          placeholder="Country"
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
      </div>
      <div>
        <input
          placeholder="Latitude"
          type="number"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
        />
      </div>
      <div>
        <input
          placeholder="Longitude"
          type="number"
          value={lng}
          onChange={(e) => setLng(e.target.value)}
        />
      </div>
      <div>
        <input
          placeholder="Image Url"
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      <button className="spot-modal-submit" type="submit">
        Submit
      </button>
    </form>
    </>
  );
}

export default EditSpotForm;
