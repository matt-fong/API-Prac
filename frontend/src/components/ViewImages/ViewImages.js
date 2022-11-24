import React from "react";
import { useDispatch, useSelector } from "react-redux";
import './ViewImages.css'
import { getAllSpots } from "../../store/spots";
import { deleteImageById } from "../../store/images";

const ViewImages = ({ spot }) => {

  const sessionUser = useSelector(state => state.session.user);

  const spotImagesArr = spot?.Images

  const dispatch = useDispatch();

  let viewImages;

  if (spotImagesArr.length === 1) {
    viewImages = (
      <div>
        {spotImagesArr.map((image, i) =>
          <div key={i}>
            <img className='viewimages-image' src={image?.url} alt=''></img>
          </div>
        )}
      </div>
    )
  } else {
    viewImages = (
      <div>
        {spotImagesArr.map((image, i) =>
          <div key={i}>
            <img className='viewimages-image' src={image?.url} alt=''></img>
            <div>
              {sessionUser && (spot?.ownerId === sessionUser.id) && (
                <i className="viewimages-trash fa-solid fa-trash fa-lg" onClick={() => dispatch(deleteImageById(image?.id)).then(dispatch(getAllSpots()))}></i>
              )}
              {/* <i className="viewimages-trash fa-solid fa-trash fa-lg" onClick={() => dispatch(deleteImageById(image?.id))}></i> */}
            </div>
            {/* <div onClick={() => dispatch(deleteImageById(image?.id)).then(dispatch(getAllSpots()))}>Delete</div> */}
          </div>
        )}
      </div>
    )
  }


  return (
    <>
      {/* <div>
        {spotImagesArr.map((image, i) =>
          <div key={i}>
            <img className='viewimages-image' src={image?.url}></img>
            <div>
              <i className="viewimages-trash fa-solid fa-trash fa-lg" onClick={() => dispatch(deleteImageById(image?.id)).then(dispatch(getAllSpots()))}></i>
            </div>
          </div>
        )}
      </div> */}

      {viewImages}

    </>
  );
};

export default ViewImages;
