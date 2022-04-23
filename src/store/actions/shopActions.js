import axios from "axios";

export const SET_PRODUCTS = "shop/setProducts";

export const ADD_TO_BASKET = "shop/addToBasket";
export const DECREASE_PRODUCT = "shop/decreaseProduct";

export const fetchProducts = () => (dispatch) => {
  axios.get("https://fakestoreapi.com/products").then((res) => {
    dispatch({
      type: SET_PRODUCTS,
      payload: res.data,
    });
  });
};

export const addToBasket = (product) => (dispatch) => {
  dispatch({
    type: ADD_TO_BASKET,
    payload: product,
  });
};
export const decreaseProduct = (product) => (dispatch) => {
  dispatch({
    type: DECREASE_PRODUCT,
    payload: product,
  });
};
