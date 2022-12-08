import { csrfFetch } from "./csrf";

const CREATE = "images/CREATE";
const DELETE = "images/DELETE";


export const createImage = (review) => {
  return {
    type: CREATE,
    review,
  };
};

export const createImageBySpotId = (spotId, imageData) => async (dispatch) => {
  const formData = new FormData();
  formData.append("image", imageData.image);

  const reqData = {
    method: "POST",
    // headers: {"Content-Type": "application/json"},
    headers: {"Content-Type": "multipart/form-data",},
    // body: JSON.stringify(imageData),
    body: formData,
  };
  const res = await csrfFetch(`/api/spots/${spotId}/images`, reqData);
  if (res.ok) {
    const data = await res.json();
    dispatch(createImage(data));
  }
  return res;
};

export const deleteImage = (imageId) => {
  return {
    type: DELETE,
    imageId,
  };
};

export const deleteImageById = (imageId) => async (dispatch) => {
  const reqData = {
    method: "DELETE",
  };
  const res = await csrfFetch(`/api/images/${imageId}`, reqData);
  if (res.ok) {
    dispatch(deleteImage(imageId));
  }
  return res;
};

export default function imagesReducer(state = {}, action) {
  let newState;
  switch (action.type) {
    case CREATE:
      newState = { ...state };
      // newState[action.review.id] = action.review;
      return newState;
    case DELETE:
      newState = { ...state };
      delete newState[action.imageId];
      return newState;
    default:
      return state;
  }
}
