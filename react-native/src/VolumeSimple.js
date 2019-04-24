import React from "react";
import {
  VolumeHeadlessHooks,
  VolumeHeadlessRenderProps
} from "../react-headless";
import { volumeStatechart } from "../core";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const buttonStyle = {
  backgroundColor: "#1586da",
  borderRadius: 50,
  padding: 15,
  margin: 15
};

const buttonTextStyle = {
  fontSize: 20,
  textAlign: "center",
  textTransform: "uppercase",
  color: "white"
};

const styles = StyleSheet.create({
  button: buttonStyle,
  buttonText: buttonTextStyle,
  disabledButton: {
    ...buttonStyle,
    opacity: 0.5,
    backgroundColor: "#777"
  },
  centeredText: {
    textAlign: "center"
  }
});

function VolumeSimple({ volumeProps }) {
  return (
    <View>
      <Text style={styles.centeredText}>Volume: {volumeProps.volume}</Text>
      <Text style={styles.centeredText}>
        Volume State: {volumeProps.volumeState}
      </Text>
      <TouchableOpacity
        onPress={volumeProps.increase}
        disabled={!volumeProps.actions.INCREASE}
        style={
          !volumeProps.actions.INCREASE ? styles.disabledButton : styles.button
        }
      >
        <Text style={styles.centeredText}>INCREASE</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={volumeProps.decrease}
        disabled={!volumeProps.actions.DECREASE}
        style={
          !volumeProps.actions.DECREASE ? styles.disabledButton : styles.button
        }
      >
        <Text style={styles.centeredText}>DECREASE</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={volumeProps.reset}
        disabled={volumeProps.volumeState === volumeStatechart.initial}
        style={
          volumeProps.volumeState === volumeStatechart.initial
            ? styles.disabledButton
            : styles.button
        }
      >
        <Text style={styles.centeredText}>RESET</Text>
      </TouchableOpacity>
    </View>
  );
}

export function VolumeSimpleHooks() {
  return (
    <VolumeHeadlessHooks statechart={volumeStatechart}>
      {volumeProps => {
        return <VolumeSimple volumeProps={volumeProps} />;
      }}
    </VolumeHeadlessHooks>
  );
}

export function VolumeSimpleRenderProps() {
  return (
    <VolumeHeadlessRenderProps statechart={volumeStatechart}>
      {volumeProps => {
        return <VolumeSimple volumeProps={volumeProps} />;
      }}
    </VolumeHeadlessRenderProps>
  );
}
