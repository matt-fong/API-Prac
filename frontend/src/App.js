import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
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

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    dispatch(spotsActions.getAllSpots())
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/spots/:spotId/create-review">
            <CreateReview />
          </Route>
          <Route path="/reviews/:reviewId">
            <EditReview />
          </Route>
          <Route path="/spots/:spotId/edit">
            <EditSpot />
          </Route>
          <Route path="/spots/:spotId">
            <SpotDetails />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/my-spots">
            <UserSpots />
          </Route>
          <Route path="/create-spot">
            {/* {user ? <CreateSpot />: <Redirect to='/signup' /> } */}
            <CreateSpot />
          </Route>
          <Route path="/my-reviews">
            <UserReviews />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
