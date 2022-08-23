import { csrfFetch } from "./csrf";


export const GET_ALL_SPOTS = 'spots/getAllSpots/get'
export const CREATE_A_SPOT = 'spots/createSpot/post'
export const EDIT_A_SPOT = 'spots/editSpot/update'
export const DELETE_A_SPOT = 'spots/Spot/delete'

// Actions
const getAllSpotsAction = (payload) => {
    return {
        type: GET_ALL_SPOTS,
        payload
    }
}

const createSpotAction = (payload) => {
    return {

        type: CREATE_A_SPOT,
        payload
    }
}

const editSpotAction = (payload) => {
    return {
        type: EDIT_A_SPOT,
        payload
    }
}

const deleteSpotAction = (id) => {
    return {
        type: DELETE_A_SPOT,
        id
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

export const editSpot = (payload) => async (dispatch) => {
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(editSpotAction(data))
    }
}

export const deleteSpot = (id) => async (dispatch) => {
    const response = await csrfFetch('/api/spots', {
        method: 'DELETE',
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(deleteSpotAction(id))
        return data
    }
}

// Reducer
export const spotsReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case GET_ALL_SPOTS:
        newState = {...state, ...action.payload['Spots']}
      return newState;
    case CREATE_A_SPOT:
        newState = {...state}
        return newState;
    case EDIT_A_SPOT:
        newState = {...state}
        return newState;
    case DELETE_A_SPOT:
        newState = {...state}
        return newState;
    default:
        return state;
  }
};
