import React from 'react';
import { StyleSheet, FlatList, SafeAreaView, Alert } from 'react-native';
import Card from "./Components/Card";
import Header from "./Components/Header";
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import {NUMBER_OF_RANDOM_NUMBERS} from "../../Constants";
import {resetStep, resetCards, RootActions} from "../../Actions/Index";
import {ICard} from "../../Reducers/CardReducer";
import {RootState} from "../../Store/Index";

interface FlippedCard {
  flipCard: Function;
  number: number;
}
type Props = {
  steps: number;
  cards: any;
  lastFlippedCard: ICard;
} & RootActions

interface State {
  cards: ICard[];
  cardNumbers: number[];
  flipBackFunctions: Function[];
}
class Home extends React.Component<Props, State>{
  constructor(props) {
    super(props);
    this.state = {
      cardNumbers: [],
      flipBackFunctions: [],
      cards: []
    };
  }

  componentDidMount() {
    this.props.resetStep();
    this.props.resetCards();
  }

  restart(flippedCardsArr: ICard[],flippedCardsBackFuncArr:Function[], matchedNumbers:number[]) {
    return function () {
      flippedCardsArr.splice(0, flippedCardsArr.length);
      
      for (let flippedCardsBackFunc of flippedCardsBackFuncArr) {
        flippedCardsBackFunc();
      }
      flippedCardsBackFuncArr.splice(0, flippedCardsBackFuncArr.length);
  
      matchedNumbers.splice(0, matchedNumbers.length);
    }
  }
  

  onFlip(flippedCardsArr:ICard[], flippedCardsBackFuncArr:Function[], matchedNumbers: number[]) {
    const restart = this.restart(flippedCardsArr, flippedCardsBackFuncArr, matchedNumbers);
    const resetStep = this.props.resetStep;
    return function (card, flipBackFunction) {
      const lastFlippedCardIndex = flippedCardsArr.length - 1;
      const lastFlippedCard = flippedCardsArr[flippedCardsArr.length - 1];
      if (lastFlippedCardIndex % 2 === 0 && lastFlippedCard) {
        if (lastFlippedCard.value === card.value) {
          matchedNumbers.push(lastFlippedCard.value);
          if (matchedNumbers.length === NUMBER_OF_RANDOM_NUMBERS) {
            Alert.alert("Congratulations!", `You won the game by ${flippedCardsArr.length + 1} steps`, [{
              text: "Try another round",
              onPress: () => {
                flipBackFunction();
                restart();
                resetStep();
              }
            }]);
            return;
          }
        } else {
          setTimeout(() => {
            flippedCardsBackFuncArr[lastFlippedCardIndex]();
            flipBackFunction();
          }, 1000);
        }
        flippedCardsBackFuncArr.push(flipBackFunction);
        flippedCardsArr.push(card);
      } else {
        flippedCardsArr.push(card);
        flippedCardsBackFuncArr.push(flipBackFunction);
      }
    }
  }

  render() {
    const flippedCardsArr = [];
    const flippedCardsBackFuncArr: Function[] = [];
    const matchedNumbers = [];
    return (
      <SafeAreaView style={styles.container}>
        <Header restart={this.restart(flippedCardsArr, flippedCardsBackFuncArr, matchedNumbers)} />
        <FlatList
          style={{ width: "100%" }}
          numColumns={3}
          keyExtractor={(item, index) => `${index}`}
          data={this.props.cards}
          renderItem={({ item , index}) => {
            if (item.value === -1) {
              return <Card isEmpty />
            }
            return <Card onFlip={this.onFlip(flippedCardsArr, flippedCardsBackFuncArr, matchedNumbers)} card={item} />
          }}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column'
  },
  card: {
    flex: 1,
    backgroundColor: 'red',
    height: 150,
    borderRadius: 20,
    margin: 10,
  }
});

const mapStateToProps = (state: RootState) => ({
  cards: state.card.cards
});

const ActionCreators = Object.assign(
  {},
  {resetStep, resetCards}
);

const mapDispatchToProps = (dispatch: Dispatch<RootActions>) => bindActionCreators(ActionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home)


