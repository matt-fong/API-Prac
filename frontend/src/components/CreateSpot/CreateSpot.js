import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import * as spotActions from "../../store/spots";

const CreateSpot = () => {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [url, setUrl] = useState('');
  const [errors, setErrors] = useState([]);
  const [submit, setSubmit] = useState(false);

  const dispatch = useDispatch();

  if (submit) {
    return <Redirect to="/" />;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    let data = {
      address: address,
      city: city,
      state: state,
      country: country,
      lat: lat,
      lng: lng,
      name: name,
      description: description,
      price: price,
      url,
      previewImage: true
    };
    return dispatch(spotActions.createSpot(data))
      .then(async (res) => {
        setSubmit(true);
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data) {
          if (data.errors) {
            setErrors(data.errors);
          } else if (data.message) {
            setErrors([data.message]);
          }
        }
      });
  };

  return (
    <form className="spotsCreate" onSubmit={onSubmit}>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <h1 className="createFormTitle">Host Your Home</h1>
      <label className="createName">
        <span> Name: </span>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label>
        <span>Address:</span>
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </label>
      <label>
        <span>City:</span>
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
      </label>
      <label>
        <span>State:</span>
        <input
          type="text"
          placeholder="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
        />
      </label>
      <label className="createCountry">
        <span>Country:</span>
        <input
          type="text"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />
      </label>
      <label className="createLat">
        <span>Latitude:</span>
        <input
          type="text"
          placeholder="Latitude"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
          required
        />
      </label>
      <label className="createLong">
        <span>Longitude:</span>
        <input
          type="text"
          placeholder="Longitude"
          value={lng}
          onChange={(e) => setLng(e.target.value)}
          required
        />
      </label>
      <label className="createDescription">
        <span>Description:</span>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </label>
      <label className="createPrice">
        <span>Price per night:</span>
        <input
          type="text"
          placeholder="$"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </label>
      <label className="createPrice">
        <span>Image:</span>
        <input
          type="text"
          placeholder="image Url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
      </label>
      <button className="createSpotButton" type="submit">
        Create New Spot
      </button>
    </form>
  )
}

export default CreateSpot;
