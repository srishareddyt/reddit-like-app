import React from 'react';
import './Modal.css';
import { FaRegWindowClose } from 'react-icons/fa';

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <FaRegWindowClose className="close-icon" onClick={handleClose} />
        {children}
      </section>
    </div>
  );
};

export default Modal;
