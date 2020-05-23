export interface RootActions {
  resetStep: Function;
  incrementStep: Function;
}

export const RESET_STEP = "RESET_STEP";
export const INCREMENT_STEP = "INCREMENT_STEP";

export function resetStep(count: number) {
  return {
    type: RESET_STEP
  }
}

export function incrementStep() {
  return {
    type: INCREMENT_STEP
  }
}