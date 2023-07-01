import styles from '../modal/modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from '../order-details/order-details';

const Modal = () => {
  return (
    <div className="">
      <div className="">
        <CloseIcon type="primary" />
      </div>
      <OrderDetails />
    </div>
  )
}

export default Modal;