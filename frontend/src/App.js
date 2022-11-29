import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation/Navigation";
import HomePage from "./components/HomePage/HomePage";
import * as spotsActions from "./store/spots";
import SpotDetails from "./components/SpotDetails/SpotDetails";
import UserSpots from "./components/UserSpots/UserSpots";
import UserReviews from "./components/UserReviews/UserReviews";
import CurrentBookings from "./components/CurrentBookings/CurrentBookings";
import UserBookings from "./components/UserBookings/UserBookings";
import UserPastBookings from "./components/UserBookings/UserPastBookings";
import BookingConfirmed from "./components/BookingConfirmed/BookingConfirmed";
import UserProfile from "./components/UserProfile/UserProfile";
import Maps from "./components/Maps/Maps";
import MapContainer from "./components/Maps";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoadedd, setIsLoadedd] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    dispatch(spotsActions.getAllSpots()).then(() => setIsLoadedd(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} isLoadedd={isLoadedd}/>
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            {/* <Navigation isLoaded={isLoaded} isLoadedd={isLoadedd}/> */}
            <HomePage />
          </Route>
          <Route path="/spots/:spotId/:ownerId">
            <SpotDetails isLoaded={isLoaded} isLoadedd={isLoadedd}/>
          </Route>
          <Route path="/my-spots">
            <UserSpots />
          </Route>
          <Route path="/my-reviews">
            <UserReviews isLoaded={isLoaded} />
          </Route>
          <Route path="/my-bookings/past">
            <UserPastBookings />
          </Route>
          <Route path="/my-bookings">
            <UserBookings isLoaded={isLoaded} />
          </Route>
          <Route path="/current-bookings/:spotId">
            <CurrentBookings />
          </Route>
          <Route path="/confirmed/:spotId/:bookingId">
            <BookingConfirmed />
          </Route>
          <Route path="/users/account/:userId">
            <UserProfile />
          </Route>
          <Route path="/testing">
            <MapContainer />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
