import styles from '../order-details/order-details.module.css';
import done from '../../image/done.png';
import { memo } from 'react';
import PropTypes from 'prop-types';

const OrderDetails = memo(({ orderId }) => {
  return (
    <div className={styles.wrapper}>
      <h1 className={`text text_type_digits-large ${styles.order_id}`}>{orderId}</h1>
      <h2 className="text text_type_main-medium">идентификатор заказа</h2>
      <img src={done} alt="Заказ подтвержден" className={`text text_type_main-medium ${styles.img}`} />
      <p className="text text_type_main-default pb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
    </div >
  )
})

OrderDetails.propTypes = {
  orderId: PropTypes.number.isRequired,
};

export default OrderDetails;