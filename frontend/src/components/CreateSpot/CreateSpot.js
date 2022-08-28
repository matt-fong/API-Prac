import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as spotActions from "../../store/spots";
import './CreateSpot.css'

const CreateSpot = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(null);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [url, setUrl] = useState(null);
  const [errors, setErrors] = useState([]);
  const [submit, setSubmit] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  // if (submit) {
  //   return <Redirect to="/" />;
  // }

  function isImage(url) {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url)
  }

  // console.log('THIS IS IMAGE?', isImage('https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg'))

  // console.log('THIS IS ERRORS', errors)
  // console.log('THIS IS ERRORS LENGTH', errors.length)

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
      url: url,
      previewImage: true
    };

    if (!isImage(url)) {
      setErrors({ error: "Must be a valid image: jpg, jpeg, png, webp, avif, gif, svg " })
    }

    if (isImage(url)) {
      dispatch(spotActions.createSpot(data))
      history.push('/')
        // .then(async (res) => {
        //   setSubmit(true);
        // })
        // .catch(async (res) => {
        //   const data = await res.json();
        //   if (data) {
        //     if (data.errors) {
        //       setErrors(data.errors);
        //     } else if (data.message) {
        //       setErrors([data.message]);
        //     }
        //   }
        // });
    }

  };

  return (
    <>
    <div className="createSpotContainer">
      <div className="createSpotHeader"></div>
      <div className="createSpotForm">
        <form onSubmit={onSubmit}>
          <ul>
            {Object.values(errors).map((error, i) => (
              <li key={i}>{error}</li>
            ))}
          </ul>
          <h1>Host Your Home</h1>
          <div className="createSpotInput">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="createSpotInput">
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="createSpotInput">
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>
          <div className="createSpotInput">
            <input
              type="text"
              placeholder="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
            />
          </div>
          <div className="createSpotInput">
            <input
              type="text"
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </div>
          <div className="createSpotInput">
            <input
              type="number"
              placeholder="Latitude"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
              required
            />
          </div>
          <div className="createSpotInput">
            <input
              type="number"
              placeholder="Longitude"
              value={lng}
              onChange={(e) => setLng(e.target.value)}
              required
            />
          </div>
          <div className="createSpotInput">
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="createSpotInput">
            <input
              type="number"
              placeholder="$ Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className="createSpotInput">
            <input
              type="text"
              placeholder="Image-Url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </div>
          <button className="createSpotButton" type="submit">
            Create New Spot
          </button>
        </form>
      </div>
      </div>
    </>
  )
}

export default CreateSpot;
