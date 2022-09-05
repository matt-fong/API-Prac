import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams, useHistory } from "react-router-dom";
import "./EditSpotModal.css";
import { editSpot } from "../../store/spots";
import { getAllSpots } from "../../store/spots";

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

    setErrors([]);
    dispatch(editSpot(data, spot.id))
    dispatch(getAllSpots()).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });

    history.push('/')

  };

  // return (
  //   <>
  //     <div className="editSpotContainer">
  //       <div className="editSpotHeader">
  //       <div className="editSpotForm">
  //         <form onSubmit={onSubmit}>
  //           <ul>
  //             {Object.values(errors).map((error, i) => (
  //               <li key={i}>{error}</li>
  //             ))}
  //           </ul>
  //           <h1>Edit Your Home</h1>
  //           <div className="editSpotInput">
  //             <input
  //               placeholder="Spot Name"
  //               type="text"
  //               value={name}
  //               onChange={(e) => setName(e.target.value)}
  //               required
  //             />
  //           </div>
  //           <div className="editSpotInput">
  //             <input
  //               placeholder="Address"
  //               type="text"
  //               value={address}
  //               onChange={(e) => setAddress(e.target.value)}
  //               required
  //             />
  //           </div>
  //           <div className="editSpotInput">
  //             <input
  //               placeholder="City"
  //               type="text"
  //               value={city}
  //               onChange={(e) => setCity(e.target.value)}
  //               required
  //             />
  //           </div>
  //           <div className="editSpotInput">
  //             <input
  //               placeholder="State"
  //               type="text"
  //               value={state}
  //               onChange={(e) => setState(e.target.value)}
  //               required
  //             />
  //           </div>
  //           <div className="editSpotInput">
  //             <input
  //               placeholder="Country"
  //               type="text"
  //               value={country}
  //               onChange={(e) => setCountry(e.target.value)}
  //               required
  //             />
  //           </div>
  //           <div className="editSpotInput">
  //             <input
  //               placeholder="Latitude"
  //               type="number"
  //               value={lat}
  //               onChange={(e) => setLat(e.target.value)}
  //               required
  //             />
  //           </div>
  //           <div className="editSpotInput">
  //             <input
  //               placeholder="Longitude"
  //               type="number"
  //               value={lng}
  //               onChange={(e) => setLng(e.target.value)}
  //               required
  //             />
  //           </div>
  //           <div className="editSpotInput">
  //             <input
  //               placeholder="Description"
  //               type="text"
  //               value={description}
  //               onChange={(e) => setDescription(e.target.value)}
  //               required
  //             />
  //           </div>
  //           <div className="editSpotInput">
  //             <input
  //               placeholder="$ Price"
  //               type="number"
  //               value={price}
  //               onChange={(e) => setPrice(e.target.value)}
  //               required
  //             />
  //           </div>
  //           <div className="editSpotButtonContainer">
  //             <button className="editSpotButton" onClick={() =>  history.push('/my-spots')}>Go Back</button>
  //             <button className="editSpotButton" type="submit">Submit</button>
  //           </div>
  //         </form>
  //       </div>
  //       </div>
  //     </div>
  //   </>
  // );
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
        <button className="createSpotSubmit" type="submit">
          Create New Spot
        </button>
      </div>
    </form>
  )

}

export default EditSpotForm;
