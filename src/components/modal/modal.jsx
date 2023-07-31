import styles from '../modal/modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { useEffect } from 'react';
import { useRef } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const Modal = ({ onClose, children, container }) => {

  const modalBox = useRef();

  useEffect(() => {

    const handleEscClose = (evt) => {
      if (evt.key === "Escape") {
        onClose();
      }
    }

    const handleOverlayClose = (evt) => {
      if (modalBox.current && !modalBox.current.contains(evt.target)) {
        onClose();
      }
    }

    document.addEventListener('keydown', handleEscClose);
    document.addEventListener('mousedown', handleOverlayClose);

    return () => {
      document.removeEventListener('keydown', handleEscClose);
      document.removeEventListener('mousedown', handleOverlayClose);
    };
  }, [])

  return createPortal(
    <>
      <div className={styles.modal}>{children}
        <div onClick={onClose} className={styles.close_button}>
          <CloseIcon type="primary" />
        </div>
      </div>
      <ModalOverlay onClose={onClose} />
    </>,
    container
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Modal;