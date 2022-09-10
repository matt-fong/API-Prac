import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import './CreateImage.css'
import img from './xButton.jpg'
import CreateImage from './CreateImage';

function CreateImageModal() {
  const [showModal, setShowModal] = useState(false);

  const onX = () => {
    setShowModal(false)
  }

  return (
    <>
      <button className='CreateImage-button' onClick={() => setShowModal(true)}>Add Image</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className='CreateImage-modal-container'>
            <div className='CreateImage-modal-header'>
              <img className='CreateImageXButton' onClick={onX} src={img}></img>
              <div className='CreateImageCreateImage'>Add Image</div>
            </div>
            <div className='CreateImage-modal-form'>
              <div className='CreateImage-welcome'>Add an image</div>
              <CreateImage onX={ onX }/>
            </div>
          </div>
      </Modal>
      )}
    </>
  );
}

export default CreateImageModal;
