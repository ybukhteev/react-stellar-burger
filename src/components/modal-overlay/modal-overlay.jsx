import styles from '../modal-overlay/modal-overlay.module.css'
import Modal from '../modal/modal';

const ModelOverlay = ({ onClose }) => {
  return (
    <div className={styles.overlay}>
      <Modal onClose={onClose} />
    </div>
  );
};

export default ModelOverlay;