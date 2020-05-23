import {RESET_STEP, INCREMENT_STEP} from "../Actions/Index";

const initialState = {
  count: 0
};

const stepReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_STEP:
      return {
        ...state,
        count: 0
      };
    case INCREMENT_STEP:
      console.log("Increment step");
      return {
        ...state,
        count: ++state.count
      }
    default:
      return state;
  }
}
export default stepReducer;