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

const getSpotByIdAction = (spot) => {
    return {
        type: GET_SPOT_BY_ID,
        spot
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

const editSpotAction = (spot) => {
    return {
        type: EDIT_A_SPOT,
        spot,
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
        console.log('THIS IS DATA', data)
        dispatch(getAllSpotsAction(data.Spots))
    }
}

export const getSpotById = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`)
    if (response.ok){
        const data = await response.json();
        console.log(data)
        dispatch(getSpotByIdAction(data))
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
    // create initial spot based on data
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(payload)
    })
    if (response.ok) { // wait for successful creation
        const data = await response.json(); // If successful, fetch api to create image
        const imageResponse = await csrfFetch(`/api/spots/${data.id}/images`, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                url: payload.url,
                previewImage: payload.previewImage
            })
        }) // Creates image for the spot
        if(imageResponse.ok) { // If the create image for spots is successful
            const imageData = await imageResponse.json()
            data.previewImage = imageData.url // Then add it to the data object
            dispatch(createSpotAction(data))
        }
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
        dispatch(editSpotAction(data))
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
        newState = {  }
        action.payload.forEach((spot) => {
            newState[spot.id] = spot
        })
        return newState;
    case CREATE_A_SPOT:
        newState = { ...state }
        newState[action.payload.id] = action.payload
        return newState;
    case EDIT_A_SPOT:
        newState = { ...state };
        newState[action.spot.id] = action.spot;
        return newState;
    case DELETE_A_SPOT:
        newState = { ...state };
        delete newState[action.spotId];
        return newState;
    case GET_SPOT_BY_ID:
        newState = { ...state }
        newState[action.spot.id] = action.spot
        return newState;
    default:
        return state;
  }
};
