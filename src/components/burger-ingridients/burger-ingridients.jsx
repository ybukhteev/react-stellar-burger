import React from 'react';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-ingridients.module.css';

const BurgerIngridients = ({ }) => {

  const [current, setCurrent] = React.useState("Булки");

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

      <div className="">
        <ul>
          <h2>Булки</h2>
          <ul></ul>
        </ul>
        <ul>
          <h2>Соусы</h2>
          <ul></ul>
        </ul>
        <ul>
          <h2>Начинки</h2>
          <ul></ul>
        </ul>
      </div>
    </section >
  )
}

export default BurgerIngridients;   