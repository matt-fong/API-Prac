import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import './LoginModal.css'

function LoginModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='login-button' onClick={() => setShowModal(true)}>Log In</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className='login-modal-container'>
            <div className='login-modal-header'>
              Log in
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
