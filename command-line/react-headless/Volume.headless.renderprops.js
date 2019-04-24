import React from "react";
import { Machine } from "xstate";
import {
	volumeStateToValue,
	machineToComponentState,
	EVENTS
} from "../core";

export class VolumeHeadlessRenderProps extends React.PureComponent {
	constructor(props) {
		super(props);
		const { statechart } = this.props;
		this.machine = Machine(statechart);

		const {
			initialState
		} = this.machine;
		this.state = machineToComponentState(
			initialState
		);

		this.maxVolume = volumeStateToValue(
			Object.keys(
				statechart.states
			).pop()
		);
		this.minVolume = volumeStateToValue(
			Object.keys(statechart.states)
		);
	}
	increase = () => {
		const nextState = this.machine.transition(
			this.state.volumeState,
			EVENTS.INCREASE
		);
		const nextComponentState = machineToComponentState(
			nextState
		);
		this.setState(nextComponentState);
	};
	decrease = () => {
		const nextState = this.machine.transition(
			this.state.volumeState,
			EVENTS.DECREASE
		);
		const nextComponentState = machineToComponentState(
			nextState
		);
		this.setState(nextComponentState);
	};
	reset = () => {
		this.setState(
			machineToComponentState(
				this.machine.initialState
			)
		);
	};
	render() {
		const {
			state,
			maxVolume,
			minVolume,
			increase,
			decrease,
			reset
		} = this;
		const {
			volume,
			volumeState,
			actions
		} = state;
		return this.props.children({
			maxVolume,
			minVolume,
			volume,
			volumeState,
			actions,
			increase,
			decrease,
			reset
		});
	}
}
