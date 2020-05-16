import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native';

interface Props {
  isEmpty?: boolean;
  number?: number;
}

export default function Card(props: Props) {
  if (props.isEmpty || !props.number) {
    return <View style={styles.emptyContainer}></View>
  }
  
  let cardAnimatedInt = 0;
  const cardAnimatedValue = getNewAnimatedValue(0);
  cardAnimatedValue.addListener(({ value }) => {
    cardAnimatedInt = value;
  });
  
  const numberSideFlexValue = getNewAnimatedValue(0);
  const hiddenSideFlexValue = getNewAnimatedValue(1);

  const frontAnimatedStyle = setupFrontFlip(cardAnimatedValue);
  const backAnimatedStyle = setupBackFlip(cardAnimatedValue);


  return (
    <TouchableOpacity onPress={() => {
      flipCard(cardAnimatedInt, cardAnimatedValue, numberSideFlexValue, hiddenSideFlexValue);
    }} style={styles.container}>
      <Animated.View style={[styles.cardContainer, backAnimatedStyle, {flex: numberSideFlexValue, height: 0}]}>
        <Animated.Text style={[styles.text]}>{props.number}</Animated.Text>
      </Animated.View>
      <Animated.View style={[styles.cardContainer, frontAnimatedStyle, {flex: hiddenSideFlexValue, height: 0}]}>
        <Animated.Text style={[styles.text]}>{"?"}</Animated.Text>
      </Animated.View>
      
      
    </TouchableOpacity>
  );
}

function getNewAnimatedValue(value: number): Animated.Value {
  return new Animated.Value(value);
}

function flipCard(flipValue: number, cardAnimatedValue: Animated.Value, numberFlexValue: Animated.Value, hiddenFlexValue: Animated.Value) {
  console.log(flipValue);
  if (flipValue >= 90) {
    Animated.spring(cardAnimatedValue,{
      toValue: 0,
      friction: 8,
      tension: 10
    }).start();

    Animated.timing(
      numberFlexValue,
      {
        toValue: 0,
        duration: 0,
      }
    ).start();

    Animated.timing(
      hiddenFlexValue,
      {
        toValue: 1,
        duration: 0,
      }
    ).start();
  } else {
    Animated.spring(cardAnimatedValue,{
      toValue: 180,
      friction: 8,
      tension: 10
    }).start();

    Animated.timing(
      numberFlexValue,
      {
        toValue: 1,
        duration: 0,
      }
    ).start();

    Animated.timing(
      hiddenFlexValue,
      {
        toValue: 0,
        duration: 0,
      }
    ).start();
  }
}

function setupFrontFlip (animatedValue: Animated.Value): {
  transform: {
      rotateY: Animated.AnimatedInterpolation;
  }[];
} {
  const frontInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const frontAnimatedStyle = {
    transform: [
      { rotateY: frontInterpolate}
    ]
  }

  return frontAnimatedStyle;
}

function setupBackFlip(animatedValue: Animated.Value): {
  transform: {
      rotateY: Animated.AnimatedInterpolation;
  }[];
} {
  const backInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg']
  });

  const backAnimatedStyle = {
    transform: [
      { rotateY: backInterpolate }
    ]
  }
  return backAnimatedStyle;
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    height: 150,
    margin: 10,

  },
  cardContainer: {
    flex: 1,
    backgroundColor: '#121f75',
    justifyContent: 'center',
    borderRadius: 20
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