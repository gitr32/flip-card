import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Card from "./Components/Card";

export default class Home extends React.Component{
  render() {
    return (
      <View style={styles.container}>
        <Card/>
        <Card/>
        <Card isEmpty/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    display: "flex",
    flexDirection: "row"
  },
  card: {
    flex: 1,
    backgroundColor: 'red',
    height: 150,
    borderRadius: 20,
    margin: 10,
  }
});


