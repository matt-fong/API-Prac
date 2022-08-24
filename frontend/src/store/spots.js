import { csrfFetch } from "./csrf";


export const GET_ALL_SPOTS = 'spots/getAllSpots/get'
export const GET_SPOT_BY_ID = 'spots/getSpotById/get'
export const GET_OWNED_SPOTS = 'spots/getOwnedSpots/get'
export const CREATE_A_SPOT = 'spots/createSpot/post'
export const EDIT_A_SPOT = 'spots/editSpot/update'
export const DELETE_A_SPOT = 'spots/delete'

// Actions
const getAllSpotsAction = (payload) => {
    return {
        type: GET_ALL_SPOTS,
        payload
    }
}

const getSpotByIdAction = (payload) => {
    return {
        type: GET_SPOT_BY_ID,
        payload
    }
}

const getOwnedSpotsAction = (payload) => {
    return {
        type: GET_OWNED_SPOTS,
        payload
    }
}

const createSpotAction = (payload) => {
    return {

        type: CREATE_A_SPOT,
        payload
    }
}

const editSpotAction = (payload, spotId) => {
    return {
        type: EDIT_A_SPOT,
        payload,
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
export const getAllSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots', {
        method: 'GET'
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(getAllSpotsAction(data))
    }
}

export const getSpotsById = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'GET'
    })
    if (response.ok){
        const data = await response.json();
        dispatch(getSpotByIdAction(data))
        return response;
    }
}

export const getOwnedSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots/current', {
        method: 'GET'
    })
    const data = await response.json();
    dispatch(getOwnedSpotsAction(data))
    return response;
}

export const createSpot = (payload) => async (dispatch) => {
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(createSpotAction(data))
    }
}

export const editSpot = (payload, spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'PUT',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(payload)
    })
    if (response.ok){
        const data = await response.json();
        dispatch(getSpotsById(data.id))
        return response;
    }
}

export const deleteSpot = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE',
    })
    if (response.ok) {
        dispatch(deleteSpotAction(spotId))
    }
    return response
}

// Reducer
export const spotsReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case GET_ALL_SPOTS:
        newState = {...state, ...action.payload['Spots']}
      return newState;
    case CREATE_A_SPOT:
        newState = {...state, ...action.payload}
        return newState;
    case EDIT_A_SPOT:
        newState = { ...state };
        newState[action.spot.id] = action.spot;
        return newState;
    case DELETE_A_SPOT:
        newState = { ...state };
        delete newState[action.spotId];
        return newState;
    default:
        return state;
  }
};
