import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Api from "../api/api";
import { useCallback, useState } from "react";
import { useEffect } from "react";
import IngredientDetails from "../ingredients-details/ingredients-details";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";

const api = new Api();

const modalRoot = document.getElementById('modals');

const App = () => {

  const [state, setState] = useState({
    isLoading: false,
    hasErrors: false,
    data: {},
  })

  const [popupIsOpened, setPopup] = useState(false);
  const [currentIngredient, setIngredient] = useState(null);
  const [isActive, setIsActive] = useState(false);

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

  const togglePopup = () => {
    setPopup(!popupIsOpened);
  }

  const openIngredientStatus = useCallback((item) => {
    setIngredient(item);
    setIsActive(true);
    togglePopup();
  }, [])

  const openConfirm = useCallback(() => {
    setIsActive(false);
    togglePopup();
  }, [])

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        {state.isLoading && "Loading..."}
        {state.hasErrors && "Failed"}
        {!state.isLoading && !state.hasErrors && state.data.length && (
          <>
            <BurgerIngredients data={state.data} onOpenIngredientStatus={openIngredientStatus} />
            <BurgerConstructor data={state.data} onOpenIngredientStatus={openIngredientStatus} onOpenConfirm={openConfirm} />

          </>
        )}
      </main>

      {popupIsOpened && (
        <Modal onClose={togglePopup} container={modalRoot}>
          {isActive ? (<IngredientDetails ingredient={currentIngredient} />) : (<OrderDetails orderId='034536' />)}
        </Modal>
      )}
    </>
  )
}

export default App;
