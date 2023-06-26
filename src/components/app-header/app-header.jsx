// Импорт иконок из библиотеки UI-компонентов
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

// Импорт стилей из CSS модуля
import styles from './app-header.module.css';

const AppHeader = () => {
  return (
    <header className={`p-4 ${styles.header}`}>
      <nav className={`${styles.header__nav} ${styles.header__nav_links}`}>
        <ul className={styles.list}>
          <li className={`pt-4 pr-5 pb-4 pl-5 ${styles.list__items}`}>
            <BurgerIcon type="primary" />
            <p className="text text_type_main-default">Конструктор</p>
          </li>
          <li className={`pt-4 pr-5 pb-4 pl-5 ${styles.list__items}`}>
            <ListIcon type="secondary" />
            <p className="text text_type_main-default text_color_inactive">Лента заказов</p>
          </li>
        </ul>
      </nav>
      <Logo />
      <nav className={styles.header__nav_user}>
        <ul>
          <li className={`pt-4 pr-5 pb-4 pl-5 ${styles.list__items}`} >
            <ProfileIcon type="secondary" />
            <p className="text text_type_main-default text_color_inactive">Личный кабинет</p>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default AppHeader;