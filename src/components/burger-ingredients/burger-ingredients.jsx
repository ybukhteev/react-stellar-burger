import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsItems from '../ingredient-items/ingredient-items';
import PropTypes from 'prop-types';
import { memo, useMemo, useContext, useRef } from 'react';
import styles from './burger-ingredients.module.css';

import { BurgerIngredientsContext } from '../../services/context/ingredient-context';
import { BurgerConstructorContext } from '../../services/context/ingredient-context';

import { TotalPriceContext } from '../../services/context/total-price-context';

const BurgerIngredients = memo(({ onOpenIngredientStatus }) => {
  const { totalPriceDispatcher } = useContext(TotalPriceContext);
  const data = useContext(BurgerIngredientsContext);
  const { setBun, setConstructorIngredients, constructorIngredients } = useContext(BurgerConstructorContext);
  const [current, setCurrent] = React.useState("Булки");

  const bunsRef = useRef();
  const saucesRef = useRef();
  const mainRef = useRef();

  const handleTabClick = (ref) => {
    const elem = ref;
    elem.current.scrollIntoView({
      behavior: "smooth"
    })
  }

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
            onClick={() => {
              setCurrent("Булки");
              handleTabClick(bunsRef);
            }}
          >
            Булки
          </Tab>
        </li>
        <li>
          <Tab
            value="Соусы"
            active={current === 'Соусы'}
            onClick={() => {
              setCurrent("Соусы");
              handleTabClick(saucesRef);
            }}
          >
            Соусы
          </Tab>
        </li>
        <li>
          <Tab
            value="Начинки"
            active={current === 'Начинки'}
            onClick={() => {
              setCurrent("Начинки");
              handleTabClick(mainRef);
            }}
          >
            Начинки
          </Tab>
        </li>
      </ul>

      <div className={styles.result__list}>
        <h2 ref={bunsRef} className="text text_type_main-medium">Булки</h2>
        <ul className={`pl-4 pr-4 ${styles.ingredients_box}`}>
          {bunsList.map((item) => {
            return (
              <IngredientsItems
                key={item._id}
                ingredient={item}
                onIngredientClick={() => {
                  onOpenIngredientStatus(item);
                  setBun(item);
                }}
              />
            );
          })}
        </ul>
        <h2 ref={saucesRef} className="text text_type_main-medium">Соусы</h2>
        <ul className={`pl-4 pr-4 ${styles.ingredients_box}`}>
          {saucesList.map((item) => {
            return (
              <IngredientsItems
                key={item._id}
                ingredient={item}

                onIngredientClick={() => {
                  onOpenIngredientStatus(item);
                  const isAdded = constructorIngredients.some((ingredient) => {
                    return ingredient._id === item._id;
                  });
                  if (!isAdded) {
                    setConstructorIngredients((constructorIngredients) => [
                      ...constructorIngredients,
                      item,
                    ]);
                  }
                }}
              />
            );
          })}
        </ul>
        <h2 ref={mainRef} className="text text_type_main-medium">Начинки</h2>
        <ul className={`pl-4 pr-4 ${styles.ingredients_box}`}>
          {toppingList.map((item) => {
            return (
              <IngredientsItems
                key={item._id}
                ingredient={item}
                onIngredientClick={() => {
                  onOpenIngredientStatus(item);
                  const isAdded = constructorIngredients.some((ingredient) => {
                    return ingredient._id === item._id;
                  });
                  if (!isAdded) {
                    setConstructorIngredients((constructorIngredients) => [
                      ...constructorIngredients,
                      item,
                    ]);
                  }
                }}
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
  onOpenIngredientStatus: PropTypes.func.isRequired,
};



export default BurgerIngredients;