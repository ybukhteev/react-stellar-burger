import { useEffect, createRef } from 'react';
import styles from '../modal-overlay/modal-overlay.module.css'
import Modal from '../modal/modal';

const ModelOverlay = ({ onClose }) => {

  const ModalBox = createRef();

  useEffect(() => {
    document.addEventListener('keydown', handleEscClose);
    document.addEventListener('mousedown', handleOverlayClose);

    return () => {
      document.removeEventListener('keydown', handleEscClose);
      document.removeEventListener('mousedown', handleOverlayClose);
    };
  }, []);

  const handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      onClose();
    }
  }

  const handleOverlayClose = (evt) => {
    if (!ModalBox.current.contains(evt.target)) {
      onClose();
    }
  }

  return (
    <div className={styles.overlay}>
      <Modal ref={ModalBox} onClose={onClose} />
    </div>
  );
};

export default ModelOverlay;