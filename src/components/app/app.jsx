import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Api from "../api/api";
import { useState } from "react";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import IngredientDetails from "../ingredients-details/ingredients-details";
import Modal from "../modal/modal";

const api = new Api();

const modalRoot = document.getElementById('modals');
const ingredient = {
  "_id": "60666c42cc7b410027a1a9ba",
  "name": "Соус с шипами Антарианского плоскоходца",
  "type": "sauce",
  "proteins": 101,
  "fat": 99,
  "carbohydrates": 100,
  "calories": 100,
  "price": 88,
  "image": "https://code.s3.yandex.net/react/code/sauce-01.png",
  "image_mobile": "https://code.s3.yandex.net/react/code/sauce-01-mobile.png",
  "image_large": "https://code.s3.yandex.net/react/code/sauce-01-large.png",
  "__v": 0
};

const App = () => {

  const [state, setState] = useState({
    isLoading: false,
    hasErrors: false,
    data: {},
  })

  const [popupIsOpened, setPopup] = useState(false);

  const togglePopup = () => {
    setPopup(!popupIsOpened);
  }

  useEffect(() => {
    (() => {
      setState({ ...state, hasErrors: false, isLoading: true });
      api
        .getIngredients()
        .then(({ data }) => setState({ ...state, data, isLoading: false }))
        .catch((e) => {
          setState({ ...state, hasErrors: true, isLoading: false });
        });
    })();
  }, []);

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        {state.isLoading && "Loading..."}
        {state.hasErrors && "Failed"}
        {!state.isLoading && !state.hasErrors && state.data.length && (
          <>
            <BurgerIngredients data={state.data} onOpenPopup={togglePopup} />
            <BurgerConstructor data={state.data} onOpenPopup={togglePopup} />
          </>
        )}
      </main>

      {popupIsOpened &&
        createPortal(
          <Modal onClose={togglePopup}>
            <IngredientDetails ingredient={ingredient} />
          </Modal>,
          modalRoot
        )}
    </>
  )
}

export default App;
