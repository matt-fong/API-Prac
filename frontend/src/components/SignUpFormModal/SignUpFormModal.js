import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignUpForm from './SignUpForm'
import './SignUpModal.css';
import img from './xButton.png'

function SignUpFormModal() {
  const [showModal, setShowModal] = useState(false);

  const onX = () => {
    setShowModal(false)
  }

  return (
    <>
      <button className="signup-button" onClick={() => setShowModal(true)}>Sign Up</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className='signup-modal-container'>
            <div className='signup-modal-header'>
            <img className='signupXButton' onClick={onX} src={img}></img>
              <div className='signupSignup'>Sign up</div>
            </div>
            <div className='signup-modal-form'>
              <div className='signup-welcome'>Become a member of Airdnd</div>
              <SignUpForm />
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

export default SignUpFormModal;
