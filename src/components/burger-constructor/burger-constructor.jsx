import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

import { memo, useMemo, useContext} from "react";
import styles from '../burger-constructor/burger-constructor.module.css'
import ingredientType from "../../utils/prop-types";
import { BurgerIngredientsContext } from "../../services/context/ingredient-context";


const BurgerConstructor = memo(({ onOpenIngredientStatus, onOpenConfirm }) => {
  const data = useContext(BurgerIngredientsContext);
  const burgerIngredientsList = useMemo(() => 
    data.filter((item) => {
      return item.type !== "bun";
    }), [data] 
  );

  const bun = useMemo(() => data.find((item) => item.type === "bun"), [data]);

  return (
    <section className={`pl-4 pr-4 ${styles.section}`}>
      <div className={styles.ingredients}>
        <ConstructorElement
          extraClass={styles.buns}
          type="top"
          isLocked={true}
          text={`${bun.name} (верх)`}
          price={bun.price}
          thumbnail={bun.image}
        />

        <ul className={styles.list}>
          {burgerIngredientsList.map((item) => {
            return (
              <li key={item._id} className={styles.list__items} onClick={() => onOpenIngredientStatus(item)}>

                <DragIcon type="primary" />
                <ConstructorElement
                  key={item._id}
                  text={`${bun.name} (низ)`}
                  price={bun.price}
                  thumbnail={bun.image}
                />
              </li>
            );
          })}
        </ul>

        <ConstructorElement
          extraClass={styles.buns}
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i (низ)"
          price={200}
          thumbnail={data[0].image}
        />
      </div>

      <div className={styles.totalOrder}>
        <div className={styles.price}>
          <p className="text text_type_digits-medium">610</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button onClick={onOpenConfirm} htmlType="button" type="primary" size="large"> Оформить заказ</Button>
      </div>

    </section>
  )
}
)

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientType).isRequired,
};

export default BurgerConstructor;