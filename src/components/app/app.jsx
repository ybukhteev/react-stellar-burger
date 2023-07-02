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
import OrderDetails from "../order-details/order-details";
import ModalOverlay from "../modal-overlay/modal-overlay";

const api = new Api();

const modalRoot = document.getElementById('modals');

const App = () => {

  const [popupIsOpened, setPopup] = useState(false);

  const [state, setState] = useState({
    isLoading: false,
    hasErrors: false,
    data: {},
  })

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

  const [currentIngredient, setIngredient] = useState(null);

  const changeIngredient = (item) => {
    setIngredient(item);
    togglePopup();
  }

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        {state.isLoading && "Loading..."}
        {state.hasErrors && "Failed"}
        {!state.isLoading && !state.hasErrors && state.data.length && (
          <>
            <BurgerIngredients data={state.data} onOpenIngredientStatus={changeIngredient} />
            <BurgerConstructor data={state.data} onOpenIngredientStatus={changeIngredient} onOpenConfirmPopup={togglePopup} />

          </>
        )}
      </main>

      {popupIsOpened &&
        createPortal(
          <Modal onClose={togglePopup}>
            <IngredientDetails ingredient={currentIngredient} />
          </Modal>,
          modalRoot
        )}
    </>
  )
}

export default App;
