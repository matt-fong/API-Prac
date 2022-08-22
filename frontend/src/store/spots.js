import { csrfFetch } from "./csrf";


export const GET_ALL_SPOTS = 'spots/getAllSpots/get'
export const GET_SPOT_DETAILS = 'spots/spotDetails/get'
export const GET_OWNER_OWNED_SPOTS = 'spots/ownerOwned/get'
export const CREATE_SPOT = 'spots/createSpot/post'
export const EDIT_A_SPOT = 'spots/editSpot/update'
export const DELETE_A_SPOT = 'spots/Spot/delete'

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

const editSpotAction = (spotId) => {
    return {
        type: EDIT_A_SPOT,
        spotId
    }
}

const deleteSpotAction = (spotId) => {
  return {
      type: DELETE_A_SPOT,
      spotId
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
