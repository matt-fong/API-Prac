import React, { useState } from 'react';
import { ModalImages } from '../../context/Modal';
import './ViewImages.css'
import img from './xButton.jpg'
import ViewImages from './ViewImages';

function ViewImagesModal({ spot }) {
  const [showModal, setShowModal] = useState(false);

  const onX = () => {
    setShowModal(false)
  }

  return (
    <>
      <button className='viewImages-button' onClick={() => setShowModal(true)}>View Images</button>
      {showModal && (
        <ModalImages onClose={() => setShowModal(false)}>
          <div className='viewImages-modal-container'>
            <div className='viewImages-modal-header'>
              <img className='viewImagesXButton' onClick={onX} src={img}></img>
              <div className='viewImagesviewImages'>Images</div>
            </div>
            <div className='viewImages-modal-form'>
              {/* <div className='viewImages-welcome'>Images</div> */}
              <ViewImages onX={ onX } spot={spot}/>
            </div>
          </div>
      </ModalImages>
      )}
    </>
  );
}

export default ViewImagesModal;
