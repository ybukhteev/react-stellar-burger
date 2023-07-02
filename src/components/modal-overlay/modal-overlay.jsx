import styles from '../modal-overlay/modal-overlay.module.css'

const ModalOverlay = ({ children }) => {
  return <div className={styles.overlay}>{children}</div>
};

export default ModalOverlay;