import styles from '../ingredient-items/ingredient-items.module.css';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientType from '../../utils/prop-types';

const IngredientsItems = ({ ingredient, onIngredientClick }) => {
  return (
    <li className={styles.item} onClick={onIngredientClick}>
      <Counter count={1} size="default" extraClass="m-1" />
      <img className="pr-4 pl-4" src={ingredient.image} alt={ingredient.name} />
      <div className={`pt-1 pb-1 ${styles.price}`}>
        <p className="text text_type_digits-default">{ingredient.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default">{ingredient.name}</p>
    </li>
  )
}

IngredientsItems.propTypes = {
  ingrexdient: ingredientType.isRequired,
};

export default IngredientsItems;