import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  isEmpty?: boolean;
  number?: number;
}

export default function Card(props: Props) {
  if (props.isEmpty || !props.number) {
    return <View style={styles.emptyContainer}></View>
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.number}</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121f75',
    height: 150,
    borderRadius: 20,
    margin: 10,
    justifyContent: 'center'
  },
  text: {
    textAlign: 'center',
    fontSize: 30,
    color: '#e1e2e6',
    fontWeight: '500'
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    height: 150,
    borderRadius: 20,
    margin: 10,
  },
});