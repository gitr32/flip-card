import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RootActions,resetCards, resetStep } from "../../../Actions/Index";

interface Props {
  restart: Function;
  steps: number;
  resetCards: Function;
  resetStep: Function;
}

export function Header(props: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <TouchableOpacity onPress={async () => {
          props.restart();
          await new Promise((resolve, reject) => setTimeout(() => resolve(), 1000))
          props.resetCards();
          props.resetStep();
          }}>
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

const mapStateToProps = (state: { step: { count: number } }) => ({
  steps: state.step.count
});

const ActionCreators = Object.assign(
  {},
  {resetCards, resetStep}
);

const mapDispatchToProps = (dispatch: Dispatch<RootActions>) => bindActionCreators(ActionCreators, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(Header)