import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsItems from '../ingredient-items/ingredient-items';
import PropTypes from 'prop-types';
import ingredientType from '../../utils/prop-types';
import { memo, useMemo, useContext } from 'react';
import styles from './burger-ingredients.module.css';

import { BurgerIngredientsContext } from '../../services/context/ingredient-context';

const BurgerIngredients = memo(({ onOpenIngredientStatus }) => {
  const data = useContext(BurgerIngredientsContext);

  const [current, setCurrent] = React.useState("Булки");

  const bunsList = useMemo(() =>
    data.filter((item) => {
      return item.type === "bun";
    }), [data]
  );

  const saucesList = useMemo(() =>
    data.filter((item) => {
      return item.type === "sauce";
    }), [data]
  );

  const toppingList = useMemo(() =>
    data.filter((item) => {
      return item.type === "main";
    }), [data]
  );

  return (
    <section className={`pt-10 ${styles.section}`}>
      <h1 className="pb-5 text text_type_main-large">Соберите бургер</h1>

      <ul className={styles.ingredients_tabs}>
        <li>
          <Tab
            value="Булки"
            active={current === 'Булки'}
            onClick={setCurrent}
          >
            Булки
          </Tab>
        </li>
        <li>
          <Tab
            value="Соусы"
            active={current === 'Соусы'}
            onClick={setCurrent}
          >
            Соусы
          </Tab>
        </li>
        <li>
          <Tab
            value="Начинки"
            active={current === 'Начинки'}
            onClick={setCurrent}
          >
            Начинки
          </Tab>
        </li>
      </ul>

      <div className={styles.result__list}>
        <h2 className="text text_type_main-medium">Булки</h2>
        <ul className={`pl-4 pr-4 ${styles.ingredients_box}`}>
          {bunsList.map((item) => {
            return (
              <IngredientsItems
                key={item._id}
                ingredient={item}
                onIngredientClick={() => onOpenIngredientStatus(item)}
              />
            );
          })}
        </ul>
        <h2 className="text text_type_main-medium">Соусы</h2>
        <ul className={`pl-4 pr-4 ${styles.ingredients_box}`}>
          {saucesList.map((item) => {
            return (
              <IngredientsItems
                key={item._id}
                ingredient={item}
                onIngredientClick={() => onOpenIngredientStatus(item)}
              />
            );
          })}
        </ul>
        <h2 className="text text_type_main-medium">Начинки</h2>
        <ul className={`pl-4 pr-4 ${styles.ingredients_box}`}>
          {toppingList.map((item) => {
            return (
              <IngredientsItems
                key={item._id}
                ingredient={item}
                onIngredientClick={() => onOpenIngredientStatus(item)}
              />
            );
          })}
        </ul>
      </div>
    </section >
  )
}
)

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientType).isRequired,
};


export default BurgerIngredients;