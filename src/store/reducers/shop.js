import { ADD_TO_BASKET, SET_PRODUCTS, DECREASE_PRODUCT } from "../actions/shopActions";

const initState = {
  products: [],
  basket: JSON.parse(localStorage.getItem("basket")) || [],
  loading: true,
};
export function shop(state = initState, action) {
  const newState = { ...state };

  switch (action.type) {
    case SET_PRODUCTS:
      newState.products = action.payload;
      break;

    case ADD_TO_BASKET:
      console.log("add to basket in reducer");
      const index = newState.basket.findIndex((i) => i.product.id === action.payload.id);
      if (index === -1) {
        newState.basket = [...newState.basket, { product: action.payload, count: 1 }];
      } else {
        newState.basket[index].count += 1;
        newState.basket = [...newState.basket];
      }
      break;
    case "basketProduct/remove":
      newState.basket = state.basket.filter(({ product }) => {
        console.log("ps");
        return product.id !== action.payload;
      });
      break;
    case DECREASE_PRODUCT:
      const ind = newState.basket.findIndex((i) => i.product.id === action.payload.id);
      if (newState.basket[ind].count == 1) {
        function filterbasket(_, index) {
          return index != ind;
        }

        newState.basket = [...newState.basket.filter(filterbasket)];
      } else {
        newState.basket[ind].count -= 1;
        newState.basket = [...newState.basket];
      }
      break;
    case "basketProduct/reset":
      newState.basket = state.basket.filter(({ product }) => product.id === action.payload);
      break;
    case "isLoaded":
      newState.loading = action.payload;
      break;
    default:
      return state;
  }
  localStorage.setItem("basket", JSON.stringify(newState.basket));
  return newState;
}
