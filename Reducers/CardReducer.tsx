import {RESET_CARDS, FLIP_CARD} from "../Actions/Index";

export interface ICard {
  id: number;
  value: number;
  flipped: boolean;
}

const initialState: {
  cards: ICard[]
} = {
  cards: []
};

const cardReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_CARDS:
      return {
        ...state,
        cards: action.payload.cards
      };
    case FLIP_CARD: 
      const cardId = action.payload.id;
      const cards = state.cards;
      cards.forEach(card => {
        if (cardId === card.id) {
          card.flipped = true;
        }
      });
      return {
        ...state,
        cards
      }
    default:
      return state;
  }
}
export default cardReducer;