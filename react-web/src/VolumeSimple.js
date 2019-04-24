import React from "react";
import {
	VolumeHeadlessHooks,
	VolumeHeadlessRenderProps
} from "./react-headless";
import { volumeStatechart } from "./core/";

export function VolumeSimpleHooks() {
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
							Volume State:{" "}
							{volumeProps.volumeState}
						</p>
						<button
							onClick={
								volumeProps.increase
							}
							disabled={
								!volumeProps.actions
									.INCREASE
							}>
							INCREASE
						</button>{" "}
						<button
							onClick={
								volumeProps.decrease
							}
							disabled={
								!volumeProps.actions
									.DECREASE
							}>
							DECREASE
						</button>{" "}
						<button
							onClick={
								volumeProps.reset
							}
							disabled={
								volumeProps.volumeState ===
								volumeStatechart.initial
							}>
							RESET
						</button>
					</div>
				);
			}}
		</VolumeHeadlessHooks>
	);
}

export function VolumeSimpleRenderProps() {
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
							Volume State:{" "}
							{volumeProps.volumeState}
						</p>
						<button
							onClick={
								volumeProps.increase
							}
							disabled={
								!volumeProps.actions
									.INCREASE
							}>
							INCREASE
						</button>{" "}
						<button
							onClick={
								volumeProps.decrease
							}
							disabled={
								!volumeProps.actions
									.DECREASE
							}>
							DECREASE
						</button>{" "}
						<button
							onClick={
								volumeProps.reset
							}>
							RESET
						</button>
					</div>
				);
			}}
		</VolumeHeadlessRenderProps>
	);
}
