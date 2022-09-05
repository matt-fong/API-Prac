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
      <button className='createSpot-button' onClick={() => setShowModal(true)}>Become a host</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className='createSpot-modal-container'>
            <div className='createSpot-modal-header'>
              <img className='createSpotXButton' onClick={onX} src={img}></img>
              <div className='createSpotcreateSpot'>Become a host</div>
            </div>
            <div className='createSpot-modal-form'>
              <div className='createSpot-welcome'>Host your home</div>
              <EditSpot onX={ onX }/>
            </div>
          </div>
      </Modal>
      )}
    </>
  );
}

export default EditSpotModal;
