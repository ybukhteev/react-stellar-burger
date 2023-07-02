import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngridients from '../burger-ingridients/burger-ingridients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Api from "../api/api";
import { useState } from "react";
import { useEffect } from "react";
import ModelOverlay from "../modal-overlay/modal-overlay";
import { createPortal } from "react-dom";

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

  const togglePopup = () => {
    setPopup(!popupIsOpened);
  }

  useEffect(() => {
    (() => {
      setState({ ...state, hasErrors: false, isLoading: true });
      api
        .getIngridients()
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
            <BurgerIngridients data={state.data} onOpenPopup={togglePopup} />
            <BurgerConstructor data={state.data} onOpenPopup={togglePopup} />
          </>
        )}
      </main>
      {popupIsOpened &&
        createPortal(
          <ModelOverlay onClose={togglePopup}>
            <OrderDetails />
          </ModelOverlay>,
          modalRoot
        )}
    </>
  )
}

export default App;
