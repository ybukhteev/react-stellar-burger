import styles from '../ingredient-items/ingredient-items.module.css';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientType from '../../utils/prop-types';
import { memo } from 'react';
import { useDrag } from 'react-dnd';
import PropTypes from "prop-types";

const IngredientsItems = memo(({ ingredient, onIngredientClick, type }) => {
  const { name, image, price, _id } = ingredient;

  const [, ref] = useDrag({
    type: type,
    item: { _id, type }
  });

  return (
    <li ref={ref} className={styles.item} onClick={onIngredientClick}>
      <Counter count={1} size="default" extraClass="m-1" />
      <img className="pr-4 pl-4" src={image} alt={name} />
      <div className={`pt-1 pb-1 ${styles.price}`}>
        <p className="text text_type_digits-default">{price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default">{name}</p>
    </li>
  )
})

IngredientsItems.propTypes = {
  ingredient: ingredientType.isRequired,
  onIngredientClick: PropTypes.func.isRequired,
};

export default IngredientsItems;