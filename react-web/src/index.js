import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import { VolumeSimpleHooks } from "./VolumeSimple";
import { VolumeSliderHooks } from "./VolumeSlider";

function App() {
	return (
		<div className="App">
			<h2>
				Simple volume manager with Hooks
			</h2>
			<VolumeSimpleHooks />
			<h2>
				Slider volume manager with Hooks
			</h2>
			<VolumeSliderHooks />
			<h2>
				Simple volume manager with
				Render Props
			</h2>
			<VolumeSimpleHooks />
			<h2>
				Slider volume manager with
				Render Props
			</h2>
			<VolumeSliderHooks />
		</div>
	);
}

const rootElement = document.getElementById(
	"root"
);
ReactDOM.render(<App />, rootElement);
