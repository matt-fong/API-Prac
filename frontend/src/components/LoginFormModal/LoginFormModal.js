import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import './LoginModal.css'
import img from './xButton.jpg'

function LoginModal() {
  const [showModal, setShowModal] = useState(false);

  const onX = () => {
    setShowModal(false)
  }

  return (
    <>
      <button className='login-button' onClick={() => setShowModal(true)}>Log In</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className='login-modal-container'>
            <div className='login-modal-header'>
              <img className='loginXButton' onClick={onX} src={img}></img>
              <div className='loginLogin'>Log in</div>
            </div>
            <div className='login-modal-form'>
              <div className='login-welcome'>Welcome to Airdnd</div>
              <LoginForm />
            </div>
          </div>
      </Modal>
      )}
    </>
  );
}

export default LoginModal;
