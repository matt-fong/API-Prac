import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import './EditReview'
import img from './xButton.jpg'
import EditReview from './EditReview';

function EditReviewModal() {
  const [showModal, setShowModal] = useState(false);

  const onX = () => {
    setShowModal(false)
  }

  return (
    <>
      <button className='editReview-button' onClick={() => setShowModal(true)}>New Review</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className='editReview-modal-container'>
            <div className='editReview-modal-header'>
              <img className='editReviewXButton' onClick={onX} src={img}></img>
              <div className='editRevieweditReview'>New Review</div>
            </div>
            <div className='editReview-modal-form'>
              <div className='editReview-welcome'>Add a review</div>
              <EditReview onX={ onX }/>
            </div>
          </div>
      </Modal>
      )}
    </>
  );
}

export default EditReviewModal;
