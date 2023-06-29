import styles from '../ingidients-items/ingridients-items.module.css';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ingridientType from '../../utils/prop-types';

const IngridientsItems = ({ ingridient }) => {
  return (
    <li className={styles.item}>
      <Counter count={1} size="default" extraClass="m-1" />
      <img className="pr-4 pl-4" src={ingridient.image} alt={ingridient.name} />
      <div className={`pt-1 pb-1 ${styles.price}`}>
        <p className="text text_type_digits-default">{ingridient.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default">{ingridient.name}</p>
    </li>
  )
}

IngridientsItems.propTypes = {
  ingridient: ingridientType.isRequired,
};

export default IngridientsItems;