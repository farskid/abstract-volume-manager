import { eventsArrayToMap } from "./eventsArrayToMap";
import { volumeStateToValue } from "./models/volume.states";

export function machineToComponentState(machineState) {
  const { value, nextEvents } = machineState;
  return {
    volume: volumeStateToValue(value),
    volumeState: value,
    actions: eventsArrayToMap(nextEvents)
  };
}
