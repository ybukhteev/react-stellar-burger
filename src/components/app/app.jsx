import styles from "./app.module.css";
import { data } from "../../utils/data";
import AppHeader from "../app-header/app-header";
import BurgerIngridients from '../burger-ingridients/burger-ingridients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

const App = () => {
  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngridients data={data} />
        <BurgerConstructor data={data} />
      </main>
    </>
  )
}

export default App;
