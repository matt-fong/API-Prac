import { csrfFetch } from "./csrf";

const GET = "reviews/GET";
const GET_CURRENT = "reviews/current"
const CREATE = "reviews/CREATE";
const UPDATE = "reviews/UPDATE";
const DELETE = "reviews/DELETE";

export const getReviews = (reviews) => {
  return {
    type: GET,
    reviews,
  };
};

export const getCurrentReviews = (reviews) => {
  return {
    type: GET_CURRENT,
    reviews,
  };
};

export const createReview = (review) => {
  return {
    type: CREATE,
    review,
  };
};

export const updateReview = (reviewId) => {
  return {
    type: UPDATE,
    reviewId,
  };
};

export const deleteReview = (reviewId) => {
  return {
    type: DELETE,
    reviewId,
  };
};

export const editReview = (payload, reviewId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
      method: 'PUT',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(payload)
  })
  if (response.ok){
      const data = await response.json();
      console.log('THIS IS DATAAAAAA', data)
      dispatch(updateReview(data))
      return response;
  }
}

export const getReviewsBySpotId = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`);
  if (res.ok) {
    const data = await res.json();
    dispatch(getReviews(data.Reviews));
  }
};

export const getReviewsByCurrentUser = () => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/current`);
  if (res.ok) {
    const data = await res.json();
    // console.log('THIS IS DATA', data)
    dispatch(getCurrentReviews(data.Reviews));
  }
};

export const deleteReviewById = (reviewId) => async (dispatch) => {
  const reqData = {
    method: "DELETE",
  };
  const res = await csrfFetch(`/api/reviews/${reviewId}`, reqData);
  if (res.ok) {
    dispatch(deleteReview(reviewId));
  }
  return res;
};

export const createNewReview = (spotId, reviewData) => async (dispatch) => {
  const reqData = {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(reviewData),
  };
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`, reqData);
  if (res.ok) {
    const data = await res.json();
    dispatch(createReview(data));
  }
  return res;
};

export default function reviewsReducer(state = {}, action) {
  let newState;
  switch (action.type) {
    case GET:
      newState = {};
      action.reviews.forEach((review) => {
        newState[review.id] = review;
      });
      return newState;
    case GET_CURRENT:
      newState = {};
      action.reviews?.forEach((review) => {
        newState[review.id] = review
      })
      return newState
    case CREATE:
      newState = { ...state };
      newState[action.review.id] = action.review;
      return newState;
    case UPDATE:
      newState = { ...state };
      newState[action.reviewId.id] = action.reviewId
      console.log('THIS IS ACTION', action)
      console.log('THIS IS ACTION PAYLOAD', action.reviewId)
      console.log('THIS IS NEW STATE', newState)
      return newState;
    case DELETE:
      newState = { ...state };
      delete newState[action.reviewId];
      return newState;
    default:
      return state;
  }
}
