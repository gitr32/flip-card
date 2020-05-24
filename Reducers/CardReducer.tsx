import {RESET_CARDS, FLIP_CARD} from "../Actions/Index";
import { NUMBER_OF_RANDOM_NUMBERS } from "../Constants";

export interface ICard {
  id: number;
  value: number;
  flipped: boolean;
}

const initialState: {
  cards: ICard[],
  lastFlippedCard: ICard
} = {
  cards: [],
  lastFlippedCard: null
};

function randomizeArr(arr: number[]) {
  for (let i = 0; i < arr.length; i++) {
    const randomIndex = Math.ceil((Math.random() * i));
    swap(arr, i, randomIndex);
  }
}

function swap(arr: number[], index1: number, index2: number) {
  const temp = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = temp;
}

const cardReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_CARDS:
      const randomNumbersMap = {};
      const randomNumbers = [];
      for (let i = 0; i < NUMBER_OF_RANDOM_NUMBERS; i++) {
        let randomNumber = Math.ceil((Math.random() * 100) + 1);
        while (randomNumbersMap[randomNumber]) {
          randomNumber = Math.ceil((Math.random() * 100) + 1);
        }
        randomNumbersMap[randomNumber] = true;
        randomNumbers.push(randomNumber);
        randomNumbers.push(randomNumber);
      }
      
  
      randomizeArr(randomNumbers);
      if (randomNumbers.length % 3 !== 0) {
        while (randomNumbers.length % 3 !== 0) {
          randomNumbers.push(-1);
        }
      }
  
      const cardsArr = randomNumbers.map((number, index) => {
        return {
          id: index,
          value: number,
          flipped: false
        }
      });

      return {
        ...state,
        cards: cardsArr
      };
    case FLIP_CARD: 
      const cardId = action.payload.id;
      const cards = state.cards;
      let currentCard = {};
      cards.forEach(card => {
        if (cardId === card.id) {
          card.flipped = true;
          currentCard = card;
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