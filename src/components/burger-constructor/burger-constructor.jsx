import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { memo, useEffect } from "react";
import styles from '../burger-constructor/burger-constructor.module.css'
import { useSelector, useDispatch } from "react-redux";
import { SET_INITAIL_BUN, SET_CURRENT_BUN, SET_INITIAL_CONSTRUCTOR_INGREDIENTS, ADD_CONSTRUCTOR_ITEM } from "../../services/actions";
import { useDrop } from "react-dnd";

const BurgerConstructor = memo(({ onOpenIngredientStatus, onOpenConfirm }) => {
  const dispatch = useDispatch();
  const totalPrice = useSelector((store) => store.ingredients.totalPrice);
  const data = useSelector((store) => store.ingredients.data);
  const currentBun = useSelector((store) => store.ingredients.currentBun);
  const constructorIngredients = useSelector((store) => store.ingredients.constructorIngredients);
  const orderNumberRequest = useSelector((store) => store.ingredients.orderNumberRequest);
  const changeConstructorBun = (item) => { dispatch({ type: SET_CURRENT_BUN, item }) }
  const addConstructorIngredient = (item) => { dispatch({ type: ADD_CONSTRUCTOR_ITEM, item }) }

  const [, dropTarget] = useDrop({
    accept: ["ingredient", "bun"],
    drop(itemId) {
      if (itemId.type === "ingredient") {
        addConstructorIngredient(itemId);
      } else {
        changeConstructorBun(itemId);
      }
    }
  })

  useEffect(() => {
    const initialArray = data.slice(0, 5).filter((item) => {
      return item.type !== "bun";
    });
    const initialBun = data.find((item) => item.type === "bun");
    dispatch({ type: SET_INITAIL_BUN, initialBun });
    dispatch({ type: SET_INITIAL_CONSTRUCTOR_INGREDIENTS, payload: initialArray })
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

        <ul ref={dropTarget} className={styles.list}>
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
          <p className="text text_type_digits-medium">{totalPrice}</p>
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