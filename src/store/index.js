import { applyMiddleware, combineReducers, createStore } from "redux";
import { movies } from "./reducers/movies";
import { todos } from "./reducers/todos";
import { characters } from "./reducers/characters";
import { shop } from "./reducers/shop";

import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

export const store = createStore(
  combineReducers({
    movies,
    todos,
    characters,
    shop,
  }),
  composeWithDevTools(applyMiddleware(thunk)),
);
