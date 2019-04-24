import React from "react";
import { Text, View, ScrollView } from "react-native";
import { VolumeSimpleHooks, VolumeSimpleRenderProps } from "./src/VolumeSimple";
import { VolumeSliderHooks, VolumeSliderRenderProps } from "./src/VolumeSlider";

export default class App extends React.Component {
  render() {
    console.log("render");
    return (
      <View>
        <ScrollView>
          <View style={{ marginVertical: 40 }}>
            <Text
              style={{
                marginVertical: 10,
                fontSize: 20,
                textAlign: "center",
                fontWeight: "600"
              }}
            >
              Volume simple with Hooks
            </Text>
            <VolumeSimpleHooks />
          </View>
          <View style={{ marginVertical: 40 }}>
            <Text
              style={{
                marginVertical: 10,
                fontSize: 20,
                textAlign: "center",
                fontWeight: "600"
              }}
            >
              Volume simple with Render Props
            </Text>
            <VolumeSimpleRenderProps />
          </View>
          <View style={{ marginVertical: 40 }}>
            <Text
              style={{
                marginVertical: 10,
                fontSize: 20,
                textAlign: "center",
                fontWeight: "600"
              }}
            >
              Volume slider with Hooks
            </Text>
            <VolumeSliderHooks />
          </View>
          <View style={{ marginVertical: 40 }}>
            <Text
              style={{
                marginVertical: 10,
                fontSize: 20,
                textAlign: "center",
                fontWeight: "600"
              }}
            >
              Volume slider with Render Props
            </Text>
            <VolumeSliderRenderProps />
          </View>
        </ScrollView>
      </View>
    );
  }
}
