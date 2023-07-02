import styles from '../modal-overlay/modal-overlay.module.css'
import Modal from '../modal/modal';

const ModalOverlay = ({ children }) => {

  return (
    <div className={styles.overlay}>
      {children}
    </div >
  );
};

export default ModalOverlay;