import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import { useCallback, useState } from "react";
import { useEffect } from "react";
import IngredientDetails from "../ingredients-details/ingredients-details";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";

import { useDispatch, useSelector } from "react-redux";
import { getIngredients, getOrderNumber } from "../../services/actions";
import { SET_CURRENT_INGREDIENT } from "../../services/actions";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const modalRoot = document.getElementById('modals');

const App = () => {
  const dispatch = useDispatch();
  const [popupIsOpened, setPopup] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const data = useSelector((store) => store.ingredients.data);
  const dataRequest = useSelector((store) => store.ingredients.dataRequest);
  const dataFailed = useSelector((store) => store.ingredients.dataFailed)
  const currentBun = useSelector((store) => store.ingredients.currentBun);
  const constructorIngredients = useSelector((store) => store.ingredients.constructorIngredients);
  const currentIngredient = useSelector((store) => store.ingredients.currentIngredient);
  const orderNumberRequest = useSelector((store) => store.ingredients.orderNumberRequest);

  const togglePopup = () => {
    setPopup(!popupIsOpened);
  }

  const openIngredientStatus = useCallback((item) => {
    setIsActive(true);
    dispatch({ type: SET_CURRENT_INGREDIENT, payload: item });
    togglePopup();
  }, [])

  const openConfirm = useCallback(() => {
    const orderArray = constructorIngredients.map((ingredient) => {
      return ingredient._id;
    })
      .concat(currentBun._id);
    dispatch(getOrderNumber(orderArray));
    setIsActive(false);
    togglePopup();
  }, [constructorIngredients, currentBun._id, dispatch]);

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        {dataRequest && "Loading..."}
        {dataFailed && "Failed"}
        {!dataRequest && !dataFailed && data.length && (
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients onOpenIngredientStatus={openIngredientStatus} />
            <BurgerConstructor onOpenIngredientStatus={openIngredientStatus} onOpenConfirm={openConfirm} />
          </DndProvider>
        )}
      </main>

      {popupIsOpened && (
        <Modal onClose={togglePopup} container={modalRoot}>
          {isActive ? (<IngredientDetails ingredient={currentIngredient} />) : (!orderNumberRequest && <OrderDetails />)}
        </Modal>
      )}
    </>
  )
}

export default App;
