import axios from "axios";

export const SET_PRODUCTS = "shop/setProducts";

export const ADD_TO_BASKET = "shop/addToBasket";
export const DECREASE_PRODUCT = "shop/decreaseProduct";

export const fetchProducts = () => (dispatch) => {
  axios.get("https://fakestoreapi.com/products").then((res) => {
    console.log("res", res);
    res.status === 200
      ? dispatch({
          type: "isLoaded",
          payload: false,
        })
      : dispatch({
          type: "isLoaded",
          payload: "error",
        });

    dispatch({
      type: SET_PRODUCTS,
      payload: res.data,
    });
  });
};

export const addToBasket = (product) => (dispatch) => {
  console.log("action");
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
