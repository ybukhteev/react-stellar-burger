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
import { defaultIngredient } from "../../utils/defaultInfo";
import { defaultBun } from "../../utils/defaultInfo";
import { useReducer } from "react";

const api = new Api();

const modalRoot = document.getElementById('modals');

const totalPriceInitialValue = { totalPrice: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "add":
      return {
        totalPrice: state.totalPrice + action.payload
      };
    default:
      throw new Error(`Wrong type of action: ${action.type} `)
  }
}

const App = () => {

  const [state, setState] = useState({
    isLoading: false,
    hasErrors: false,
    data: {},
  })

  const [bun, setBun] = useState(defaultBun);
  const [constructorIngredients, setConstructorIngredients] = useState([defaultIngredient]);
  const [totalPriceState, totalPriceDispatcher] = useReducer(reducer, totalPriceInitialValue, undefined);
  const [orderNumber, setOrderNum] = useState(null);



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
    const orderArray = constructorIngredients.map((ingredient) => {
      return ingredient._id;
    })
      .concat(bun._id);
    api
      .getOrderNum(orderArray)
      .then((res) => {
        if (res.success) {
          setOrderNum(res.order.number)
        }
      })
      .then(() => {
        setIsActive(false);
        togglePopup();
      })
      .catch((e) => {
        console.log('error');
      })
  }, [constructorIngredients, togglePopup, bun._id])

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        {state.isLoading && "Loading..."}
        {state.hasErrors && "Failed"}
        {!state.isLoading && !state.hasErrors && state.data.length && (
          <BurgerIngredientsContext.Provider value={state.data}>
            <BurgerConstructorContext.Provider
              value={{
                bun, setBun, constructorIngredients, setConstructorIngredients
              }}
            >
              <TotalPriceContext.Provider value={{ totalPriceState, totalPriceDispatcher }}>
                <BurgerIngredients onOpenIngredientStatus={openIngredientStatus} />
                <BurgerConstructor onOpenIngredientStatus={openIngredientStatus} onOpenConfirm={openConfirm} />
              </TotalPriceContext.Provider>
            </BurgerConstructorContext.Provider>
          </BurgerIngredientsContext.Provider>
        )}
      </main>

      {popupIsOpened && (
        <Modal onClose={togglePopup} container={modalRoot}>
          {isActive ? (<IngredientDetails ingredient={currentIngredient} />) : (<OrderDetails orderId={orderNumber} />)}
        </Modal>
      )}
    </>
  )
}

export default App;
