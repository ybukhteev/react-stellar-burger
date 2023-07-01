import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngridients from '../burger-ingridients/burger-ingridients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Api from "../api/api";
import { useState } from "react";
import { useEffect } from "react";
import ModelOverlay from "../modal-overlay/modal-overlay";
import { createPortal } from "react-dom";
import Modal from "../modal/modal";

const api = new Api();

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
            <BurgerIngridients data={state.data} />
            <BurgerConstructor data={state.data} onOpenPopup={togglePopup} />
          </>
        )}
      </main>
      {popupIsOpened &&
        createPortal(<ModelOverlay onClose={togglePopup} />, document.body)}
    </>
  )
}

export default App;
