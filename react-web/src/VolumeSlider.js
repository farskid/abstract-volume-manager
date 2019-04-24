import React from "react";
import {
	VolumeHeadlessHooks,
	VolumeHeadlessRenderProps
} from "./react-headless";
import { volumeStatechart } from "./core/";

function handleChange({
	nextVolume,
	currentVolume,
	increase,
	decrease
}) {
	const diff =
		nextVolume / currentVolume;

	if (diff > 1) {
		increase();
	} else if (diff < 1) {
		decrease();
	} else {
		//  volume not changed, do nothing!
	}
}

export function VolumeSliderHooks() {
	return (
		<VolumeHeadlessHooks
			statechart={volumeStatechart}>
			{volumeProps => {
				return (
					<div>
						<p>
							Volume:{" "}
							{volumeProps.volume}
						</p>
						<p>
							State:{" "}
							{volumeProps.volumeState}
						</p>
						<p>
							Can Increase:{" "}
							{Boolean(
								volumeProps.actions
									.INCREASE
							)
								.toString()
								.toUpperCase()}
						</p>
						<p>
							Can Decrease:{" "}
							{Boolean(
								volumeProps.actions
									.DECREASE
							)
								.toString()
								.toUpperCase()}
						</p>
						<p>
							{volumeProps.minVolume}
							<input
								type="range"
								step={10}
								max={Number(
									volumeProps.maxVolume
								)}
								min={Number(
									volumeProps.minVolume
								)}
								onBlur={
									volumeProps.reset
								}
								onChange={e =>
									handleChange({
										nextVolume: Number(
											e.target.value
										),
										currentVolume:
											volumeProps.volume,
										increase:
											volumeProps.increase,
										decrease:
											volumeProps.decrease
									})
								}
								value={Number(
									volumeProps.volume
								)}
							/>
							{volumeProps.maxVolume}
						</p>
					</div>
				);
			}}
		</VolumeHeadlessHooks>
	);
}

export function VolumeSliderRenderProps() {
	return (
		<VolumeHeadlessRenderProps
			statechart={volumeStatechart}>
			{volumeProps => {
				return (
					<div>
						<p>
							Volume:{" "}
							{volumeProps.volume}
						</p>
						<p>
							State:{" "}
							{volumeProps.volumeState}
						</p>
						<p>
							Can Increase:{" "}
							{Boolean(
								volumeProps.actions
									.INCREASE
							)
								.toString()
								.toUpperCase()}
						</p>
						<p>
							Can Decrease:{" "}
							{Boolean(
								volumeProps.actions
									.DECREASE
							)
								.toString()
								.toUpperCase()}
						</p>
						<p>
							{volumeProps.minVolume}
							<input
								type="range"
								step={10}
								max={Number(
									volumeProps.maxVolume
								)}
								min={Number(
									volumeProps.minVolume
								)}
								onBlur={
									volumeProps.reset
								}
								onChange={e =>
									handleChange({
										nextVolume: Number(
											e.target.value
										),
										currentVolume:
											volumeProps.volume,
										increase:
											volumeProps.increase,
										decrease:
											volumeProps.decrease
									})
								}
								value={Number(
									volumeProps.volume
								)}
							/>
							{volumeProps.maxVolume}
						</p>
					</div>
				);
			}}
		</VolumeHeadlessRenderProps>
	);
}
