<template>
  <div>
    <p>Volume: {{state.volume}}</p>
    <p>State: {{state.volumeState}}</p>
    <p>
      Can Increase:
      {{Boolean(state.actions.INCREASE)
      .toString()
      .toUpperCase()}}
    </p>
    <p>
      Can Decrease:
      {{Boolean(state.actions.DECREASE)
      .toString()
      .toUpperCase()}}
    </p>
    <div>
      <p>{{state.minVolume}}</p>
      <button class="button" :disabled="!state.actions.DECREASE" v-on:click="decrease">DECREASE</button>
      <button class="button" :disabled="!state.actions.INCREASE" v-on:click="increase">INCREASE</button>
      <button
        class="button"
        :disabled="state.volumeState === state.initial"
        v-on:click="reset"
      >RESET</button>
      <p>{{state.maxVolume}}</p>
    </div>
  </div>
</template>

<style scoped>
.button {
  margin: 0 10px;
  background-color: #1586da;
  color: #fff;
  border: 0 none;
  padding: 10px;
  cursor: pointer;
}

.button:disabled {
  cursor: not-allowed;
  background-color: #777;
  opacity: 0.3;
}
</style>

<script>
import { getState, increase, decrease, reset, initial } from "./volume.machine";

export default {
  name: "VolumeSimple",
  data: () => {
    return {
      state: { ...getState(), initial }
    };
  },
  methods: {
    setState(partialState) {
      this.state = { ...this.state, ...partialState };
    },
    increase() {
      this.setState(increase());
    },
    decrease() {
      this.setState(decrease());
    },
    reset() {
      this.setState(reset());
    },
    handleChangeMethod(e) {
      handleChange({
        nextVolume: Number(e.target.value),
        currentVolume: Number(this.state.volume),
        increase: this.increase,
        decrease: this.decrease
      });
    }
  }
};

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
</script>
