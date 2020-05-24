import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ICard } from "../../../Reducers/CardReducer";
import { incrementStep, RootActions } from "../../../Actions/Index";

interface Props {
  isEmpty?: boolean;
  onFlip?: Function;
  card: ICard;
  incrementStep: Function;
}

function Card(props: Props) {
  if (props.isEmpty || !props.card.value) {
    return <View style={styles.emptyContainer}></View>
  }

  let cardAnimatedInt = 0;
  const cardAnimatedValue = getNewAnimatedValue(0);
  cardAnimatedValue.addListener(({ value }) => {
    cardAnimatedInt = value;
  });
  
  const valueOpacityAnimatedValue = getNewAnimatedValue(0);
  const placeholderOpacityAnimatedValue = getNewAnimatedValue(1);


  const frontAnimatedStyle = setupFrontFlip(cardAnimatedValue);

  return (
    <TouchableOpacity style={{flex: 1}} onPress={() => {
      
      props.onFlip(props.card, () => {
        Animated.spring(cardAnimatedValue,{
          toValue: 0,
          friction: 8,
          tension: 10
        }).start();

        Animated.timing(valueOpacityAnimatedValue, {
          toValue: 0,
          duration: 200
        }).start();

        Animated.timing(placeholderOpacityAnimatedValue, {
          toValue: 1,
          duration: 500
        }).start();  
      });

      if (cardAnimatedInt < 90) {
        Animated.spring(cardAnimatedValue,{
          toValue: 180,
          friction: 8,
          tension: 10
        }).start();
        Animated.timing(valueOpacityAnimatedValue, {
          toValue: 1,
          duration: 500
        }).start();

        Animated.timing(placeholderOpacityAnimatedValue, {
          toValue: 0,
          duration: 200
        }).start();
      }
      props.incrementStep();
    }}>
      <Animated.View style={[styles.container, frontAnimatedStyle]}>
        <Animated.View style={[styles.cardContainer]}>
          <Animated.Text style={[styles.text, {opacity: placeholderOpacityAnimatedValue}]}>{"?"}</Animated.Text>
        </Animated.View>
        <Animated.View style={[styles.cardContainer]}>
          <Animated.Text style={[styles.text, {transform: [{rotateY: '180deg'}] ,opacity: valueOpacityAnimatedValue }]}>{props.card.value}</Animated.Text>
        </Animated.View>
      </Animated.View>
    </TouchableOpacity>
  );
}

function getNewAnimatedValue(value: number): Animated.Value {
  return new Animated.Value(value);
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 150,
    margin: 10,
    backgroundColor: '#121f75',
    justifyContent: 'center',
    borderRadius: 20
  },
  cardContainer: {
    position: "absolute",
    width: "100%",
    textAlign: "center"
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

const ActionCreators = Object.assign(
  {},
  { incrementStep }
);

const mapDispatchToProps = (dispatch: Dispatch<RootActions>) => bindActionCreators(ActionCreators, dispatch);

export default connect(null, mapDispatchToProps)(Card)
