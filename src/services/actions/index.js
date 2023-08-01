import Api from "../../components/api/api";

export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const DEL_INGREDIENT = "DEL_INGREDIENT";
export const GET_INGREDIENT_REQUEST = "GET_INGREDIENT_REQUEST";
export const GET_INGREDIENT_SUCCESS = "GET_INGREDIENT_SUCCESS";
export const GET_INGREDIENT_FAILED = "GET_INGREDIENT_FAILED";
export const SET_CURRENT_INGREDIENT = "SET_CURRENT_INGREDIENT";
export const CLEAR_CURRENT_INGREDIENT = "CLEAR_CURRENT_INGREDIENT";
export const SET_CURRENT_BUN = "SET_CURRENT_BUN";
export const SET_CONSTRUCTOR_INGREDIENTS = "SET_CONSTRUCTOR_INGREDIENTS";
export const GET_ORDER_NUMBER_REQUEST = "GET_ORDER_NUMBER_REQUEST";
export const GET_ORDER_NUMBER_SUCCESS = "GET_ORDER_NUMBER_SUCCESS";
export const GET_ORDER_NUMBER_FAILED = "GER_ORDER_NUMBER_FAILED";


const api = new Api();

export function getIngredients() {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENT_REQUEST,
    });
    api
      .getIngredients()
      .then(({ data }) => {
        dispatch({
          type: GET_INGREDIENT_SUCCESS,
          data
        });
      })
      .catch((e) => {
        dispatch({
          type: GET_INGREDIENT_FAILED
        })
      })
  }
}

export function getOrderNum(orderArray) {
  return function (dispatch) {
    dispatch({
      type: GET_ORDER_NUMBER_REQUEST
    });
    api
      .getOrderNum(orderArray)
      .then((res) => {
        dispatch({
          type: GET_ORDER_NUMBER_SUCCESS,
          payload: res.order.number
        })
      })
      .catch((e) => {
        dispatch({
          type: GET_ORDER_NUMBER_FAILED
        })
      })
  }
}
