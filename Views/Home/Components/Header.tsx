import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

interface Props {
  steps: number;
  restart: Function;
}

export default function Header(props: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <TouchableOpacity onPress={() => props.restart()}>
          <Text style={styles.restartText}>Restart</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.subContainer}>
        <Text style={styles.stepsText}>Steps: {props.steps}</Text>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    height: 40,
    borderRadius: 20,
    margin: 10,
    justifyContent: 'center',
    flexDirection: 'row'
  },
  subContainer: {
    flex: 1,
  },
  restartText: {
    fontSize: 30,
    color: 'black',
    fontWeight: '500',
    textAlign: 'left',
    marginLeft: 30
  },
  stepsText: {
    fontSize: 30,
    color: 'black',
    fontWeight: '500',
    textAlign: 'right',
    marginRight: 30
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    height: 150,
    borderRadius: 20,
    margin: 10,
  },
});