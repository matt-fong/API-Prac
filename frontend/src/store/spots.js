import { csrfFetch } from "./csrf";


export const GET_ALL_SPOTS = 'spots/getAllSpots/get'
export const GET_SPOT_DETAILS = 'spots/spotDetails/get'
export const GET_OWNER_OWNED_SPOTS = 'spots/ownerOwned/get'
export const CREATE_SPOT = 'spots/createSpot/post'
export const ADD_IMAGE_TO_SPOT = 'spots/imgSpot/post'
export const EDIT_A_SPOT = 'spots/editSpot/update'
export const GET_REVIEWS_FROM_SPOT = 'spots/reviews/get'
export const CREATE_REVIEW_SPOTID = 'spots/reviewspotid/post'
export const GET_ALL_BOOKINGS_SPOTID = 'spots/getbookings/get'
export const CREATE_BOOKING = 'spots/createbookings/post'

// Actions
const getAllSpotsAction = (payload) => {
    return {
        type: GET_ALL_SPOTS,
        payload
    }
}

const spotDetailsAction = (spotId) => {
    return {
        type: GET_SPOT_DETAILS,
        spotId
    }
}

const ownerOwnedSpotsAction = (ownerId) => {
    return {
        type: GET_OWNER_OWNED_SPOTS,
        ownerId
    }
}

const createSpotAction = (ownerId, payload) => {
    return {

        type: CREATE_SPOT,
        ownerId,
        payload
    }
}

const addImageToSpotAction = (spotId, url, userId) => {
    return {
        type: ADD_IMAGE_TO_SPOT,
        spotId,
        url,
        userId
    }
}

const editSpotAction = (spotId) => {
    return {
        type: EDIT_A_SPOT,
        spotId
    }
}

const getReviewsBySpotAction = (spotId) => {
    return {
        type: GET_REVIEWS_FROM_SPOT,
        spotId
    }
}

const createReviewAction = (spotId, payload) => {
    return {
        type: CREATE_REVIEW_SPOTID,
        payload
    }
}

const getBookingsAction = (userId, spotId, payload) => {
    return {
        type: GET_ALL_BOOKINGS_SPOTID,
        userId,
        spotId,
        payload
    }
}

const createBookingAction = (spotId, payload) => {
    return {
        type: CREATE_BOOKING,
        spotId,
        payload
    }
}

// Dispatcher
export const dispatchGetAllSpotsAction = () => async (dispatch) => {
  const response = await csrfFetch('/api/spots', {
      method: 'GET'
  })
  const data = await response.json();
  dispatch(getAllSpotsAction(data))
  return response;
}

// Reducer
export const spotsReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case GET_ALL_SPOTS:
      newState = {...state, ...action.payload['Spots']}
      return newState;
    default:
      return state;
  }
};
