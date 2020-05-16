import React from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native';
import Card from "./Components/Card";
import Header from "./Components/Header";
import { NUMBER_OF_RANDOM_NUMBERS } from "../../Constants";

interface Props {

}
interface State {
  cardNumbers: number[];
  steps: number;
}
export default class Home extends React.Component<Props, State>{

  constructor(props) {
    super(props);
    this.state = {
      cardNumbers: [],
      steps: 309
    };

  }
  componentDidMount() {
    this.populateCards();
  }

  restart(self) {
    self.setState({
      steps: 0
    });
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
    return (
      <SafeAreaView style={styles.container}>
        <Header restart={() => this.restart(this)} steps={this.state.steps} />
        <FlatList
          style={{ width: "100%" }}
          numColumns={3}
          data={this.state.cardNumbers}
          renderItem={({ item }) => {
            if (item === -1) {
              return <Card isEmpty />
            }
            return <Card number={item} />
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


