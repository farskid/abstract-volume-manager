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
    <p>
      {{state.minVolume}}
      <input
        type="range"
        step="10"
        :max="state.maxVolume"
        :min="state.minVolume"
        @input="handleChangeMethod"
        @blur="reset"
        :value="state.volume"
      >
      {{state.maxVolume}}
    </p>
  </div>
</template>

<script>
import { getState, increase, decrease, reset } from "./volume.machine";

export default {
  name: "VolumeSlider",
  data: () => {
    return {
      state: getState()
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
