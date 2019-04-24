import React, {
	useReducer
} from "react";
import { Machine } from "xstate";
import {
	volumeStateToValue,
	machineToComponentState,
	EVENTS
} from "../core";

function increaseAction(
	dispatch,
	machine
) {
	dispatch({
		type: EVENTS.INCREASE,
		machine
	});
}

function decreaseAction(
	dispatch,
	machine
) {
	dispatch({
		type: EVENTS.DECREASE,
		machine
	});
}

function resetAction(
	dispatch,
	machine
) {
	dispatch({ type: "RESET", machine });
}

function stateReducer(state, action) {
	switch (action.type) {
		case EVENTS.INCREASE:
			// @TODO: Get rid of passing machine to actions
			return machineToComponentState(
				action.machine.transition(
					state.volumeState,
					EVENTS.INCREASE
				)
			);
		case EVENTS.DECREASE:
			// @TODO: Get rid of passing machine to actions
			return machineToComponentState(
				action.machine.transition(
					state.volumeState,
					EVENTS.DECREASE
				)
			);
		case "RESET":
			return machineToComponentState(
				action.machine.initialState
			);
		default:
			return state;
	}
}

export function VolumeHeadlessHooks(
	props
) {
	const {
		statechart,
		children
	} = props;
	// Consider writing a custom hook for volume
	const machine = Machine(statechart);
	const { initialState } = machine;
	const [state, dispatch] = useReducer(
		stateReducer,
		machineToComponentState(
			initialState
		)
	);
	const maxVolume = volumeStateToValue(
		Object.keys(statechart.states).pop()
	);
	const minVolume = volumeStateToValue(
		Object.keys(statechart.states)
	);
	const {
		volume,
		volumeState,
		actions
	} = state;
	return children({
		maxVolume,
		minVolume,
		volume,
		volumeState,
		actions,
		increase: () =>
			increaseAction(dispatch, machine),
		decrease: () =>
			decreaseAction(dispatch, machine),
		reset: () =>
			resetAction(dispatch, machine)
	});
}
