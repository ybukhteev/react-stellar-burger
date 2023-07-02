import styles from '../modal/modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { forwardRef, useEffect } from 'react';
import { useRef } from 'react';

const Modal = ({ onClose, children }) => {

  const modalBox = useRef();

  useEffect(() => {
    document.addEventListener('keydown', handleEscClose);
    document.addEventListener('mousedown', handleOverlayClose);

    return () => {
      document.removeEventListener('keydown', handleEscClose);
      document.removeEventListener('mousedown', handleOverlayClose);
    };
  }, [])

  const handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      onClose();
    }
  }
  const handleOverlayClose = (evt) => {
    if (!modalBox.current.contains(evt.target)) {
      onClose();
    }
  }

  return (
    <ModalOverlay>
      <div ref={modalBox} className={styles.modal}>
        <div onClick={onClose} className={styles.close_button}>
          <CloseIcon type="primary" />
        </div>
        {children}
      </div>
    </ModalOverlay>
  );
};

export default Modal;