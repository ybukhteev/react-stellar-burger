import styles from '../order-details/order-details.module.css';
import done from '../../image/done.png';
import { memo } from 'react';
import { useSelector } from 'react-redux';

const OrderDetails = memo(() => {
  const orderNumber = useSelector((store) => store.ingredients.orderNumber);
  return (
    <div className={styles.wrapper}>
      <h1 className={`text text_type_digits-large ${styles.order_id}`}>{orderNumber}</h1>
      <h2 className="text text_type_main-medium">идентификатор заказа</h2>
      <img src={done} alt="Заказ подтвержден" className={`text text_type_main-medium ${styles.img}`} />
      <p className="text text_type_main-default pb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
    </div >
  )
})

export default OrderDetails;