import styles from '../order-details/order-details.module.css';
import done from '../../image/done.png'

const OrderDetails = () => {
  return (
    <div className="{styles.box}">
      <h1 className="">03456</h1>
      <h2 className="">идентификатор заказа</h2>
      <img src={done} alt="" className="" />
      <p className="">Ваш заказ начали готовить</p>
      <p className="">Дождитесь готовности на орбитальной станции</p>
    </div>
  )
}

export default OrderDetails;