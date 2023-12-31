// Импорт иконок из библиотеки UI-компонентов
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { memo } from 'react';


// Импорт стилей из CSS модуля
import styles from './app-header.module.css';

const AppHeader = memo(() => {
  return (
    <header className={`p-4 ${styles.header}`}>
      <nav className={`${styles.header__nav} ${styles.header__nav_links}`}>
        <ul className={styles.list}>
          <li className={`pt-4 pr-5 pb-4 pl-5 ${styles.list__items}`}>
            <a href="#" className={styles.link}>
              <BurgerIcon type="primary" />
              <p className="text text_type_main-default">Конструктор</p>
            </a>
          </li>
          <li className={`pt-4 pr-5 pb-4 pl-5 ${styles.list__items}`}>
            <a href="#" className={styles.link}>
              <ListIcon type="secondary" />
              <p className="text text_type_main-default text_color_inactive">Лента заказов</p>
            </a>
          </li>
        </ul>
      </nav>

      <Logo />

      <nav className={`${styles.header__nav} ${styles.header__nav_user}`}>
        <ul className={styles.list}>
          <li className={`pt-4 pr-5 pb-4 pl-5 ${styles.list__items}`} >
            <a href="#" className={styles.link}>
              <ProfileIcon type="secondary" />
              <p className="text text_type_main-default text_color_inactive">Личный кабинет</p>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
})

export default AppHeader;