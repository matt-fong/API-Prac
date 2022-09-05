import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditSpot from './EditSpot';
import './EditSpotModal.css'
import img from './xButton.jpg'

function EditSpotModal() {
  const [showModal, setShowModal] = useState(false);

  const onX = () => {
    setShowModal(false)
  }

  return (
    <>
      <button className='editSpot-button' onClick={() => setShowModal(true)}>Edit Spot</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className='editSpot-modal-container'>
            <div className='editSpot-modal-header'>
              <img className='editSpotXButton' onClick={onX} src={img}></img>
              <div className='editSpoteditSpot'>Edit Spot</div>
            </div>
            <div className='editSpot-modal-form'>
              <div className='editSpot-welcome'>Edit your home</div>
              <EditSpot onX={ onX }/>
            </div>
          </div>
      </Modal>
      )}
    </>
  );
}

export default EditSpotModal;
