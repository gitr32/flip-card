import { createStore, combineReducers } from 'redux';
import stepReducer from '../Reducers/StepReducer';

const rootReducer = combineReducers(
  {
    step: stepReducer
  }
);
const configureStore = () => {
  return createStore(rootReducer);
}
export default configureStore;