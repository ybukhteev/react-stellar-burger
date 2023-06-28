import styles from "./app.module.css";
import { data } from "../../utils/data";
import AppHeader from "../app-header/app-header";
import BurgerIngridients from "../burger-ingridients/burger-ingridients";

const App = () => {
  return (
    <>
      <AppHeader />
      <BurgerIngridients />
    </>
  )
}

export default App;
