import { Machine } from "xstate";
import {
	volumeStatechart,
	volumeStateToValue,
	machineToComponentState,
	eventsArrayToMap,
	EVENTS
} from "../../core/";

const machine = Machine(volumeStatechart);

export const { initial } = volumeStatechart;

// State container
let state = machineToComponentState(machine.initialState);

export const getState = () => {
	const { volumeState, volume, actions } = state;
	return {
		volumeState,
		volume,
		maxVolume: volumeStateToValue(Object.keys(volumeStatechart.states).pop()),
		minVolume: volumeStateToValue(Object.keys(volumeStatechart.states)),
		actions
	};
};

export function increase() {
	const nextState = machine.transition(state.volumeState, EVENTS.INCREASE);
	const nextComponentState = machineToComponentState(nextState);
	// setState
	state = nextComponentState;
	return nextComponentState;
}

export function decrease() {
	const nextState = machine.transition(state.volumeState, EVENTS.DECREASE);
	const nextComponentState = machineToComponentState(nextState);
	// setState
	state = nextComponentState;
	return nextComponentState;
}

export function reset() {
	const nextComponentState = machineToComponentState(machine.initialState);
	// setState
	state = nextComponentState;
	return nextComponentState;
}
