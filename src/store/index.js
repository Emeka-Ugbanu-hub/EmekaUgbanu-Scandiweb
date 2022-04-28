import { combineReducers, createStore } from "@reduxjs/toolkit";
import categoryNameReducer from "../slices/categorynameSlice";
import cartReducer from "../slices/cartslice"
import currencyReducer from "../slices/currencyslice"

// assume that the counter slice will be combined with other slices
const reducer = combineReducers({
  categoryName: categoryNameReducer,
  cart:cartReducer,
  currency:currencyReducer,

});

// create the store from the combined reducer
const store = createStore(reducer);

export default store;


