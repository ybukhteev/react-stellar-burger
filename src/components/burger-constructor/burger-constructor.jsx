import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

import styles from '../burger-constructor/burger-constructor.module.css'
import ingredientType from "../../utils/prop-types";

const BurgerConstructor = ({ data, onOpenPopup }) => {

  const onButtonClick = () => {
    onOpenPopup();
  };

  return (
    <section className={`pl-4 pr-4 ${styles.section}`}>
      <div className={styles.ingredients}>
        <ConstructorElement
          extraClass={styles.buns}
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={200}
          thumbnail={data[0].image}
        />

        <ul className={styles.list}>
          {data.filter((item) => item.type !== "bun").map((item) => {
            return (
              <li key={item._id} className={styles.list__items}>
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
        <Button onClick={onButtonClick} htmlType="button" type="primary" size="large"> Оформить заказ</Button>
      </div>

    </section>
  )
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientType).isRequired,
};

export default BurgerConstructor;