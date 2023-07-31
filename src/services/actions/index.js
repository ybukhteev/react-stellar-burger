import Api from "../../components/api/api";

export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const DEL_INGREDIENT = "DEL_INGREDIENT";
export const GET_INGREDIENT_REQUEST = "GET_INGREDIENT_REQUEST";
export const GET_INGREDIENT_SUCCESS = "GET_INGREDIENT_SUCCESS";
export const GET_INGREDIENT_FAILED = "GET_INGREDIENT_FAILED";

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
