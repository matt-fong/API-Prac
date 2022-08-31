/*

Get all current user's bookings

Get all bookings for a spot by id

Create a bookinng based on spot id

Edit a booking

Delete a booking
*/

import { csrfFetch } from "./csrf";

const GET_BY_SPOT_ID = "bookings/GET";
const GET_CURRENT = "bookings/current"
const CREATE = "bookings/CREATE";
const UPDATE = "bookings/UPDATE";
const DELETE = "bookings/DELETE";


export const getCurrentBookings = (bookings) => {
  return {
    type: GET_CURRENT,
    bookings,
  };
};

export const getBookingsByCurrentUser = () => async (dispatch) => {
  const res = await csrfFetch(`/api/bookings/current`, {
    method: 'GET'
  });
  if (res.ok) {
    const data = await res.json();
    console.log('THIS IS DATA FOR BOOKINGS', data)
    dispatch(getCurrentBookings(data.Bookings));
  }
};

export const createBookings = (booking) => {
  return {
    type: CREATE,
    booking,
  };
};

export const createNewBooking = (spotId, bookingData) => async (dispatch) => {
  const reqData = {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(bookingData),
  };
  const res = await csrfFetch(`/api/spots/${spotId}/bookings`, reqData);
  if (res.ok) {
    const data = await res.json();
    // console.log('THIS IS THE CREATE BOOKING DATA', data)
    dispatch(createBookings(data));
  }
  return res;
};

export const getBookings = (reviews) => {
  return {
    type: GET_BY_SPOT_ID,
    reviews,
  };
};


export const updateBooking = (reviewId) => {
  return {
    type: UPDATE,
    reviewId,
  };
};

export const deleteBooking = (reviewId) => {
  return {
    type: DELETE,
    reviewId,
  };
};

export const editBooking = (payload, reviewId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
      method: 'PUT',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(payload)
  })
  if (response.ok){
      const data = await response.json();
      // console.log('THIS IS DATAAA', data)
      dispatch(updateBooking(data.Bookings))
      return response;
  }
}

export const getBookingsBySpotId = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`);
  if (res.ok) {
    const data = await res.json();
    dispatch(getBookings(data.Reviews));
  }
};


export const deleteBookingById = (reviewId) => async (dispatch) => {
  const reqData = {
    method: "DELETE",
  };
  const res = await csrfFetch(`/api/reviews/${reviewId}`, reqData);
  if (res.ok) {
    dispatch(deleteBooking(reviewId));
  }
  return res;
};


export default function bookingsReducer(state = {}, action) {
  let newState;
  switch (action.type) {
    // case GET_BY_SPOT_ID:
    //   newState = {};
    //   action.reviews.forEach((review) => {
    //     newState[review.id] = review;
    //   });
    //   return newState;
    case GET_CURRENT:
      newState = {};
      action.bookings.forEach((booking) => {
        newState[booking.id] = booking
      })
      console.log('THIS IS ACTION', action)
      console.log('THIS IS NEW STATE', newState)
      return newState
    case CREATE:
      newState = { ...state };
      newState[action.booking?.booking?.id] = action.booking?.booking;
      // console.log('THIS IS ACTION', action)
      // console.log('THIS IS NEW STATE', newState)
      return newState;
    // case UPDATE:
    //   newState = { ...state };
    //   newState[action.reviewId.id] = action.reviewId
    //   // console.log('THIS IS STATE', newState)
    //   // console.log('THIS IS ACTION', action)
    // case DELETE:
    //   newState = { ...state };
    //   delete newState[action.reviewId];
    //   return newState;
    default:
      return state;
  }
}
