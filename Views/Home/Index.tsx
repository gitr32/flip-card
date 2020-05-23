import React from 'react';
import { StyleSheet, Animated, FlatList, SafeAreaView } from 'react-native';
import Card from "./Components/Card";
import Header from "./Components/Header";
import { NUMBER_OF_RANDOM_NUMBERS } from "../../Constants";
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import {resetStep, incrementStep, RootActions} from "../../Actions/Index";

interface FlippedCard {
  flipCard: Function;
  number: number;
}
type Props = {
  steps: number;
} & RootActions

interface State {
  cardNumbers: number[];
  flippedCards: FlippedCard[];
}
class Home extends React.Component<Props, State>{
  constructor(props) {
    super(props);
    this.state = {
      cardNumbers: [],
      flippedCards: []
    };
  }

  componentDidMount() {
    this.props.resetStep();
    this.populateCards();
  }

  restart(flippedCardsArr: FlippedCard[]) {
    this.props.resetStep();
    flippedCardsArr.splice(0, flippedCardsArr.length);
    this.populateCards();
  }

  flipCard(self, flippedCardsArr: FlippedCard[]) {
    return async function (card: FlippedCard) {
      flippedCardsArr.push(card);
      
      console.log(flippedCardsArr.length % 2 === 0 );

      if (flippedCardsArr.length % 2 === 0 && flippedCardsArr[flippedCardsArr.length - 2].number !== card.number) {
        await new Promise((resolve, reject) => setTimeout(() => resolve(), 1000));
        flippedCardsArr[flippedCardsArr.length - 2].flipCard();
        card.flipCard();
      }
    }
  }

  populateCards() {
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

    this.randomizeArr(randomNumbers);
    if (randomNumbers.length % 3 !== 0) {
      while (randomNumbers.length % 3 !== 0) {
        randomNumbers.push(-1);
      }
    }
    this.setState({
      cardNumbers: randomNumbers
    });
  }

  randomizeArr(arr: number[]) {
    for (let i = 0; i < arr.length; i++) {
      const randomIndex = Math.ceil((Math.random() * i));
      this.swap(arr, i, randomIndex);
    }
  }

  swap(arr: number[], index1: number, index2: number) {
    const temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
  }

  render() {
    const flippedCardsArr = [];
    return (
      <SafeAreaView style={styles.container}>
        <Header restart={() => this.restart(flippedCardsArr)} steps={this.props.steps} />
        <FlatList
          style={{ width: "100%" }}
          numColumns={3}
          keyExtractor={(item, index) => `${index}`}
          data={this.state.cardNumbers}
          renderItem={({ item }) => {
            if (item === -1) {
              return <Card isEmpty />
            }
            return <Card onFlip={this.props.incrementStep} number={item} />
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

const mapStateToProps = (state: {step: {count: number}}) => ({
  steps: state.step.count
});


const ActionCreators = Object.assign(
  {},
  {resetStep, incrementStep}
);

const mapDispatchToProps = (dispatch: Dispatch<RootActions>) => bindActionCreators(ActionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home)


