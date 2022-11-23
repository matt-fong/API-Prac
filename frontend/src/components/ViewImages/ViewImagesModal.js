import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import './CreateReview.css'
import img from './xButton.jpg'
import ViewImages from './ViewImages';

function ViewImagesModal() {
  const [showModal, setShowModal] = useState(false);

  const onX = () => {
    setShowModal(false)
  }

  return (
    <>
      <button className='createReview-button' onClick={() => setShowModal(true)}>New Review</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className='createReview-modal-container'>
            <div className='createReview-modal-header'>
              <img className='createReviewXButton' onClick={onX} src={img}></img>
              <div className='createReviewcreateReview'>New Review</div>
            </div>
            <div className='createReview-modal-form'>
              <div className='createReview-welcome'>Add a review</div>
              <ViewImages onX={ onX }/>
            </div>
          </div>
      </Modal>
      )}
    </>
  );
}

export default ViewImagesModal;
