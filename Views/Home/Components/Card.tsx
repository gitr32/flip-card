import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  isEmpty?: boolean
}

export default function Card(props: Props) {
  if (props.isEmpty) {
    return <View style={styles.emptyContainer}></View>
  }
  return (
    <View style={styles.container}>
      <Text>20</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    height: 150,
    borderRadius: 20,
    margin: 10,
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    height: 150,
    borderRadius: 20,
    margin: 10,
  },
});