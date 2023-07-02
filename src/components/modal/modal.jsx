import styles from '../modal/modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from '../order-details/order-details';
import { forwardRef } from 'react';

const Modal = forwardRef(({ onClose, children }, ref) => {
  return (
    <div ref={ref} className={styles.modal}>
      <div className={styles.close_button} onClick={onClose}>
        <CloseIcon type="primary" />
      </div>
      {children}
    </div >
  );
});

export default Modal;