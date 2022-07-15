import { combineReducers } from "redux";
import { categoryReducer } from "./categoryReducer";
import { entreeReducer } from "./entreeReducer";
import { productReducer } from "./productReducer";

const reducers = combineReducers({
  allProducts: productReducer,
  allCategory: categoryReducer,
  entreeList: entreeReducer
});
export default reducers;