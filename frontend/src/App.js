import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation/Navigation";
import HomePage from "./components/HomePage/HomePage";
import * as spotsActions from "./store/spots";
import SpotDetails from "./components/SpotDetails/SpotDetails";
import CreateSpot from "./components/CreateSpot/CreateSpot";
import UserSpots from "./components/UserSpots/UserSpots";
import EditSpot from "./components/EditSpot/EditSpot"
import UserReviews from "./components/UserReviews/UserReviews";
import CreateReview from "./components/CreateReview/CreateReview";
import EditReview from "./components/EditReview/EditReview";
import UserBookings from "./components/UserBookings/UserBookings";
import CurrentBookings from "./components/CurrentBookings/CurrentBookings";

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
            <HomePage />
          </Route>
          <Route path="/spots/:spotId/:ownerId/create-review">
            <CreateReview/>
          </Route>
          <Route path="/reviews/:reviewId/:spotId">
            <EditReview />
          </Route>
          <Route path="/spots/:spotId/edit">
            <EditSpot />
          </Route>
          <Route path="/spots/:spotId/:ownerId">
            <SpotDetails isLoaded={isLoaded} isLoadedd={isLoadedd}/>
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/my-spots">
            <UserSpots />
          </Route>
          <Route path="/my-reviews">
            <UserReviews isLoaded={isLoaded} />
          </Route>
          <Route path="/my-bookings">
            <UserBookings isLoaded={isLoaded} />
          </Route>
          <Route path="/current-bookings/:spotId">
            <CurrentBookings />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
