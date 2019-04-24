import React from "react";
import { View, Text } from "react-native";
import Slider from "@react-native-community/slider";
import {
  VolumeHeadlessHooks,
  VolumeHeadlessRenderProps
} from "../react-headless";
import { volumeStatechart } from "../core";

function handleChange({ nextVolume, currentVolume, increase, decrease }) {
  const diff = nextVolume / currentVolume;

  if (diff > 1) {
    increase();
  } else if (diff < 1) {
    decrease();
  } else {
    //  volume not changed, do nothing!
  }
}

function VolumeSlider({ volumeProps }) {
  return (
    <View style={{ alignItems: "center" }}>
      <Text style={{ marginVertical: 10, textAlign: "center" }}>
        Volume: {volumeProps.volume}
      </Text>
      <Text style={{ marginVertical: 10, textAlign: "center" }}>
        Volume State: {volumeProps.volumeState}
      </Text>
      <Text style={{ marginVertical: 10, textAlign: "center" }}>
        Can Increase: {Boolean(volumeProps.actions.INCREASE).toString()}
      </Text>
      <Text style={{ marginVertical: 10, textAlign: "center" }}>
        Can Decrease: {Boolean(volumeProps.actions.DECREASE).toString()}
      </Text>
      <Slider
        style={{ marginVertical: 10, width: 200 }}
        step={10}
        maximumValue={Number(volumeProps.maxVolume)}
        minimumValue={Number(volumeProps.minVolume)}
        onValueChange={value => {
          handleChange({
            nextVolume: Number(value),
            currentVolume: volumeProps.volume,
            increase: volumeProps.increase,
            decrease: volumeProps.decrease
          });
        }}
      />
    </View>
  );
}

export function VolumeSliderHooks() {
  return (
    <VolumeHeadlessHooks statechart={volumeStatechart}>
      {volumeProps => {
        return <VolumeSlider volumeProps={volumeProps} />;
      }}
    </VolumeHeadlessHooks>
  );
}

export function VolumeSliderRenderProps() {
  return (
    <VolumeHeadlessRenderProps statechart={volumeStatechart}>
      {volumeProps => {
        return <VolumeSlider volumeProps={volumeProps} />;
      }}
    </VolumeHeadlessRenderProps>
  );
}
