<template>
  <div id="app">
    <img width="10%" src="./assets/logo.png">
    <h3>Volume Slider</h3>
    <VolumeSlider/>
    <h3>Volume Simple</h3>
    <volumeSimple/>
  </div>
</template>

<script>
import VolumeSlider from "./components/Volume/VolumeSlider.vue";
import VolumeSimple from "./components/Volume/VolumeSimple.vue";

export default {
  name: "App",
  components: {
    VolumeSlider,
    VolumeSimple
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
