import React from "react";
import { render, Box, Text, Color, StdinContext } from "ink";
import { VolumeHeadlessRenderProps } from "./Volume.headless.renderprops";

const ARROW_UP = "\u001B[A";
const ARROW_DOWN = "\u001B[B";
const ENTER = "\r";
const RESET_TIMEOUT = 1000;

function beepTerminal() {
  process.stdout.write("\u0007");
}

function VolumeSelectWrapper() {
  return (
    <StdinContext.Consumer>
      {({ stdin, setRawMode }) => (
        <VolumeHeadlessRenderProps>
          {volumeProps => (
            <VolumeSelect
              stdin={stdin}
              setRawMode={setRawMode}
              volumeProps={volumeProps}
            />
          )}
        </VolumeHeadlessRenderProps>
      )}
    </StdinContext.Consumer>
  );
}

const eventsToActionsMap = ({ increase, decrease, reset, fallback }) => ({
  ARROW_UP: {
    INCREASE: {
      true: () => increase(),
      false: () => fallback()
    }
  },
  ARROW_DOWN: {
    DECREASE: {
      true: () => decrease(),
      false: () => fallback()
    }
  },
  ENTER: {
    RESET: {
      true: () => reset()
    }
  }
});

class VolumeSelect extends React.Component {
  state = {
    invalidKeys: [],
    showResetIndicator: false
  };

  componentWillMount() {
    console.clear();
  }

  componentDidMount() {
    const { setRawMode, stdin } = this.props;
    setRawMode(true);
    stdin.on("keypress", (_, code) => {
      // needs to exit when CTRL+C is hit (CMD+C in Mac)
      if (code.ctrl) {
        process.exit(0);
      } else {
        this.handleInput(code.sequence);
      }
    });
  }

  componentWillUnmount() {
    const { setRawMode, stdin } = this.props;
    setRawMode(false);
    stdin.removeListener("keypress", this.handleInput);
  }

  addToInvalidKeys = invalid => {
    this.setState({
      invalidKeys: this.state.invalidKeys.concat(invalid)
    });
  };

  clearInvalidKeys = () => {
    this.setState({ invalidKeys: [] });
  };

  showResetIndicator() {
    this.setState(
      prevState => {
        return {
          ...prevState,
          showResetIndicator: true
        };
      },
      () => {
        setTimeout(() => {
          this.setState({ showResetIndicator: false });
        }, RESET_TIMEOUT);
      }
    );
  }

  handleInput = data => {
    const {
      volumeProps: { actions, increase, decrease, reset }
    } = this.props;
    const dataString = String(data);

    const eventMap = eventsToActionsMap({
      increase,
      decrease,
      reset,
      fallback: beepTerminal
    });

    switch (dataString) {
      case ARROW_UP:
        eventMap.ARROW_UP.INCREASE[!!actions.INCREASE]();
        this.clearInvalidKeys();
        break;
      case ARROW_DOWN:
        eventMap.ARROW_DOWN.DECREASE[!!actions.DECREASE]();
        this.clearInvalidKeys();
        break;
      case ENTER:
        eventMap.ENTER.RESET[typeof reset === "function"]();
        this.clearInvalidKeys();
        this.showResetIndicator();
        break;
      default:
        this.addToInvalidKeys(dataString);
    }
  };

  render() {
    const {
      volume,
      volumeState,
      maxVolume,
      minVolume
    } = this.props.volumeProps;
    const { invalidKeys, showResetIndicator } = this.state;
    return (
      <div>
        <Box marginBottom={0} flexDirection="column" padding={1}>
          <Box marginBottom={0.1}>
            <Color>&#8679;</Color>
            <Color magenta>&nbsp; Increase</Color>
          </Box>
          <Box marginBottom={0.1}>
            <Color>&#8681;</Color>
            <Color magenta>&nbsp; Decrease</Color>
          </Box>
          <Box marginBottom={0.1}>
            <Color>&#9166;</Color>
            <Color magenta>&nbsp; Reset</Color>
          </Box>
        </Box>
        <Box marginBottom={0} flexDirection="column" padding={1}>
          <Text>Min: {minVolume}</Text>
          <Text>Max: {maxVolume}</Text>
        </Box>
        <Box padding={1} flexDirection="column">
          <Text>Volume: {volume}</Text>
          <Text>VolumeState: {volumeState}</Text>
        </Box>
        <Box padding={1} flexDirection="column">
          <InvalidKeys keys={invalidKeys} />
        </Box>
        {showResetIndicator ? (
          <Box padding={1} flexDirection="column">
            <Color bgRed white bold>
              &nbsp;*RESET*&nbsp;
            </Color>
          </Box>
        ) : null}
      </div>
    );
  }
}

function InvalidKeys(props) {
  const { keys = [] } = props;
  if (keys.length === 0) return null;
  return keys.map((k, i) => (
    <Box>
      <Color key={i} bgRed white>
        Invalid key bruh ¯\_(ツ)_/¯
      </Color>
    </Box>
  ));
}

render(<VolumeSelectWrapper />);
