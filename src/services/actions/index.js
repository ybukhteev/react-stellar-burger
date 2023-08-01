import Api from "../../components/api/api";

export const GET_INGREDIENT_REQUEST = "GET_INGREDIENT_REQUEST";
export const GET_INGREDIENT_SUCCESS = "GET_INGREDIENT_SUCCESS";
export const GET_INGREDIENT_FAILED = "GET_INGREDIENT_FAILED";

export const GET_ORDER_NUMBER_REQUEST = "GET_ORDER_NUMBER_REQUEST";
export const GET_ORDER_NUMBER_SUCCESS = "GET_ORDER_NUMBER_SUCCESS";
export const GET_ORDER_NUMBER_FAILED = "GER_ORDER_NUMBER_FAILED";

export const SET_CURRENT_INGREDIENT = "SET_CURRENT_INGREDIENT";
export const CLEAR_CURRENT_INGREDIENT = "CLEAR_CURRENT_INGREDIENT";

export const SET_INITIAL_CONSTRUCTOR_INGREDIENTS = "SET_INITIAL_CONSTRUCTOR_INGREDIENTS";
export const ADD_CONSTRUCTOR_ITEM = "ADD_CONSTRUCTOR_ITEM";
export const DELETE_CONSTRUCTOR_ITEM = "DELETE_CONSTRUCTOR_ITEM"

export const SET_INITAIL_BUN = "SET_INITAIL_BUN";
export const SET_CURRENT_BUN = "SET_CURRENT_BUN";
export const CHANGE_CURRENT_BUN = "CHANGE_CURRENT_BUN";


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

export function getOrderNumber(orderArray) {
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
