import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

import { memo, useContext, useEffect } from "react";
import styles from '../burger-constructor/burger-constructor.module.css'
import ingredientType from "../../utils/prop-types";


import { TotalPriceContext } from "../../services/context/total-price-context";
import { BurgerConstructorContext } from "../../services/context/ingredient-context";
import { BurgerIngredientsContext } from "../../services/context/ingredient-context";
import IngredientDetails from "../ingredients-details/ingredients-details";

import { useSelector, useDispatch } from "react-redux";
import { SET_CURRENT_BUN, SET_CONSTRUCTOR_INGREDIENTS } from "../../services/actions";



const BurgerConstructor = memo(({ onOpenIngredientStatus, onOpenConfirm }) => {
  const { totalPriceState } = useContext(TotalPriceContext);
  const dispatch = useDispatch();

  const data = useSelector((store) => store.ingredients.data);
  const currentBun = useSelector((store) => store.ingredients.currentBun);
  const constructorIngredients = useSelector((store) => store.ingredients.constructorIngredients);
  const orderNumberRequest = useSelector((store) => store.ingredients.orderNumberRequest);

  useEffect(() => {
    const initialArray = data.slice(0, 5).filter((item) => {
      return item.type !== "bun";
    });
    const initialBun = data.find((item) => item.type === "bun");
    dispatch({ type: SET_CURRENT_BUN, payload: initialBun });
    dispatch({ type: SET_CONSTRUCTOR_INGREDIENTS, payload: initialArray })
  }, [])

  return (
    <section className={`pl-4 pr-4 ${styles.section}`}>
      <div className={styles.ingredients}>
        <ConstructorElement
          extraClass={styles.item__bun}
          type="top"
          isLocked={true}
          text={`${currentBun.name} (верх)`}
          price={currentBun.price}
          thumbnail={currentBun.image}
        />

        <ul className={styles.list}>
          {constructorIngredients.map((item) => {
            return (
              <li key={item._id} className={styles.list__items} onClick={() => onOpenIngredientStatus(item)}>

                <DragIcon type="primary" />
                <ConstructorElement
                  key={item._id}
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image}
                />
              </li>
            );
          })}
        </ul>

        <ConstructorElement
          extraClass={styles.item__bun}
          type="bottom"
          isLocked={true}
          text={`${currentBun.name} (низ)`}
          price={currentBun.price}
          thumbnail={currentBun.image}
        />
      </div>

      <div className={styles.totalOrder}>
        <div className={styles.price}>
          <p className="text text_type_digits-medium">{totalPriceState.totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          onClick={onOpenConfirm}
          htmlType="button"
          type="primary"
          size="large"
        >
          {orderNumberRequest ? "Оформляется" : "Оформить заказ"}
        </Button>
      </div>

    </section>
  )
}
)

BurgerConstructor.propTypes = {
  onOpenIngredientStatus: PropTypes.func.isRequired,
  onOpenConfirm: PropTypes.func.isRequired,
};


export default BurgerConstructor;