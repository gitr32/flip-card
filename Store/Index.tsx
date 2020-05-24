import { createStore, combineReducers } from "redux";
import stepReducer from "../Reducers/StepReducer";
import cardReducer from "../Reducers/CardReducer";

const rootReducer = combineReducers(
  {
    step: stepReducer,
    card: cardReducer
  }
);
const configureStore = () => {
  return createStore(rootReducer);
}
export default configureStore;

export type RootState = ReturnType<typeof rootReducer>;