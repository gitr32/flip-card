export interface RootActions {
  resetStep: Function;
  incrementStep: Function;
  resetCards: Function;
  flipCard: Function;
}

export const RESET_STEP = "RESET_STEP";
export const INCREMENT_STEP = "INCREMENT_STEP";

export const RESET_CARDS = "RESET_CARDS";
export const FLIP_CARD = "FLIP_CARD";

export function resetStep() {
  return {
    type: RESET_STEP
  }
}

export function incrementStep() {
  return {
    type: INCREMENT_STEP
  }
}

export function resetCards(cards: any) {
  return {
    type: RESET_CARDS,
    payload: {
      cards
    }
  }
}

export function flipCard(id: number) {
  return {
    type: FLIP_CARD,
    payload: {
      id
    }
  }
}