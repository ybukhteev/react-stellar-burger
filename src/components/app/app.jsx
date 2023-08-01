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

import { BurgerIngredientsContext } from "../../services/context/ingredient-context";
import { BurgerConstructorContext } from "../../services/context/ingredient-context";

import { TotalPriceContext } from "../../services/context/total-price-context";
import { useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients, getOrderNum } from "../../services/actions";
import { SET_CURRENT_INGREDIENT } from "../../services/actions";

const api = new Api();

const modalRoot = document.getElementById('modals');

const totalPriceInitialValue = { totalPrice: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "total":
      return {
        totalPrice: action.payload
      }
    default:
      throw new Error(`Wrong type of action: ${action.type} `)
  }
}

const App = () => {

  const [totalPriceState, totalPriceDispatcher] = useReducer(reducer, totalPriceInitialValue, undefined);
  const [orderNumber, setOrderNum] = useState(null);



  const [popupIsOpened, setPopup] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const dispatch = useDispatch();

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

  /*
    useEffect(() => {
      if (Object.keys(bun).length > 0 && constructorIngredients.length > 0) {
        let totalIngredients = 0;
        constructorIngredients.forEach((item) => (totalIngredients += item.price));
        totalPriceDispatcher({
          type: 'total',
          payload: bun.price + totalIngredients
        })
      }
    }, [bun, constructorIngredients]);
  */

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
    dispatch(getOrderNum(orderArray));
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
          <TotalPriceContext.Provider value={{ totalPriceState, totalPriceDispatcher }}>
            <BurgerIngredients onOpenIngredientStatus={openIngredientStatus} />
            <BurgerConstructor onOpenIngredientStatus={openIngredientStatus} onOpenConfirm={openConfirm} />
          </TotalPriceContext.Provider>
        )}
      </main>

      {popupIsOpened && (
        <Modal onClose={togglePopup} container={modalRoot}>
          {isActive ? (<IngredientDetails ingredient={currentIngredient} />) : (orderNumberRequest && <OrderDetails />)}
        </Modal>
      )}
    </>
  )
}

export default App;
