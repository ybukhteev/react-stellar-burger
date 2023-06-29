import React from 'react';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngridientsItems from '../ingidients-items/ingridients-items';
import PropTypes from 'prop-types';
import ingridientType from '../../utils/prop-types';


import styles from './burger-ingridients.module.css';

const BurgerIngridients = ({ data }) => {

  const [current, setCurrent] = React.useState("Булки");

  const bunsList = data.filter((item) => item.type === "bun");
  const saucesList = data.filter((item) => item.type === "sauce");
  const toppingList = data.filter((item) => item.type === "main");

  return (
    <section className={`pt-10 ${styles.section}`}>
      <h1 className="pb-5 text text_type_main-large">Соберите бургер</h1>

      <ul className={styles.ingridients_tabs}>
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
        <ul className={styles.ingridients_box}>
          {bunsList.map((item) => {
            return <IngridientsItems key={item._id} ingridient={item} />
          })}
        </ul>
        <h2 className="text text_type_main-medium">Соусы</h2>
        <ul className={styles.ingridients_box}>
          {saucesList.map((item) => {
            return <IngridientsItems key={item._id} ingridient={item} />
          })}
        </ul>
        <h2 className="text text_type_main-medium">Начинки</h2>
        <ul className={`pt-6 ${styles.ingridients_box}`}>
          {toppingList.map((item) => {
            return <IngridientsItems key={item._id} ingridient={item} />
          })}
        </ul>
      </div>
    </section >
  )
}

BurgerIngridients.propTypes = {
  data: PropTypes.arrayOf(ingridientType).isRequired,
};


export default BurgerIngridients;