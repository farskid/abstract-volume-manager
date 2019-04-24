"use strict";

var _react = _interopRequireDefault(require("react"));

var _ink = require("ink");

var _VolumeHeadless = require("./Volume.headless.renderprops");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var ARROW_UP = "\x1B[A";
var ARROW_DOWN = "\x1B[B";
var ENTER = "\r";
var RESET_TIMEOUT = 1000;

function beepTerminal() {
  process.stdout.write("\x07");
}

function VolumeSelectWrapper() {
  return _react.default.createElement(_ink.StdinContext.Consumer, null, function (_ref) {
    var stdin = _ref.stdin,
        setRawMode = _ref.setRawMode;
    return _react.default.createElement(_VolumeHeadless.VolumeHeadlessRenderProps, null, function (volumeProps) {
      return _react.default.createElement(VolumeSelect, {
        stdin: stdin,
        setRawMode: setRawMode,
        volumeProps: volumeProps
      });
    });
  });
}

var eventsToActionsMap = function eventsToActionsMap(_ref2) {
  var increase = _ref2.increase,
      decrease = _ref2.decrease,
      reset = _ref2.reset,
      fallback = _ref2.fallback;
  return {
    ARROW_UP: {
      INCREASE: {
        true: function _true() {
          return increase();
        },
        false: function _false() {
          return fallback();
        }
      }
    },
    ARROW_DOWN: {
      DECREASE: {
        true: function _true() {
          return decrease();
        },
        false: function _false() {
          return fallback();
        }
      }
    },
    ENTER: {
      RESET: {
        true: function _true() {
          return reset();
        }
      }
    }
  };
};

var VolumeSelect =
/*#__PURE__*/
function (_React$Component) {
  _inherits(VolumeSelect, _React$Component);

  function VolumeSelect() {
    var _getPrototypeOf2;

    var _temp, _this;

    _classCallCheck(this, VolumeSelect);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(VolumeSelect)).call.apply(_getPrototypeOf2, [this].concat(args))), _this.state = {
      invalidKeys: [],
      showResetIndicator: false
    }, _this.addToInvalidKeys = function (invalid) {
      _this.setState({
        invalidKeys: _this.state.invalidKeys.concat(invalid)
      });
    }, _this.clearInvalidKeys = function () {
      _this.setState({
        invalidKeys: []
      });
    }, _this.handleInput = function (data) {
      var _this$props$volumePro = _this.props.volumeProps,
          actions = _this$props$volumePro.actions,
          increase = _this$props$volumePro.increase,
          decrease = _this$props$volumePro.decrease,
          reset = _this$props$volumePro.reset;
      var dataString = String(data);
      var eventMap = eventsToActionsMap({
        increase: increase,
        decrease: decrease,
        reset: reset,
        fallback: beepTerminal
      });

      switch (dataString) {
        case ARROW_UP:
          eventMap.ARROW_UP.INCREASE[!!actions.INCREASE]();

          _this.clearInvalidKeys();

          break;

        case ARROW_DOWN:
          eventMap.ARROW_DOWN.DECREASE[!!actions.DECREASE]();

          _this.clearInvalidKeys();

          break;

        case ENTER:
          eventMap.ENTER.RESET[typeof reset === "function"]();

          _this.clearInvalidKeys();

          _this.showResetIndicator();

          break;

        default:
          _this.addToInvalidKeys(dataString);

      }
    }, _temp));
  }

  _createClass(VolumeSelect, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      console.clear();
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var _this$props = this.props,
          setRawMode = _this$props.setRawMode,
          stdin = _this$props.stdin;
      setRawMode(true);
      stdin.on("keypress", function (_, code) {
        // needs to exit when CTRL+C is hit (CMD+C in Mac)
        if (code.ctrl) {
          process.exit(0);
        } else {
          _this2.handleInput(code.sequence);
        }
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var _this$props2 = this.props,
          setRawMode = _this$props2.setRawMode,
          stdin = _this$props2.stdin;
      setRawMode(false);
      stdin.removeListener("keypress", this.handleInput);
    }
  }, {
    key: "showResetIndicator",
    value: function showResetIndicator() {
      var _this3 = this;

      this.setState(function (prevState) {
        return _objectSpread({}, prevState, {
          showResetIndicator: true
        });
      }, function () {
        setTimeout(function () {
          _this3.setState({
            showResetIndicator: false
          });
        }, RESET_TIMEOUT);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props$volumePro2 = this.props.volumeProps,
          volume = _this$props$volumePro2.volume,
          volumeState = _this$props$volumePro2.volumeState,
          maxVolume = _this$props$volumePro2.maxVolume,
          minVolume = _this$props$volumePro2.minVolume;
      var _this$state = this.state,
          invalidKeys = _this$state.invalidKeys,
          showResetIndicator = _this$state.showResetIndicator;
      return _react.default.createElement("div", null, _react.default.createElement(_ink.Box, {
        marginBottom: 0,
        flexDirection: "column",
        padding: 1
      }, _react.default.createElement(_ink.Box, {
        marginBottom: 0.1
      }, _react.default.createElement(_ink.Color, null, "\u21E7"), _react.default.createElement(_ink.Color, {
        magenta: true
      }, "\xA0 Increase")), _react.default.createElement(_ink.Box, {
        marginBottom: 0.1
      }, _react.default.createElement(_ink.Color, null, "\u21E9"), _react.default.createElement(_ink.Color, {
        magenta: true
      }, "\xA0 Decrease")), _react.default.createElement(_ink.Box, {
        marginBottom: 0.1
      }, _react.default.createElement(_ink.Color, null, "\u23CE"), _react.default.createElement(_ink.Color, {
        magenta: true
      }, "\xA0 Reset"))), _react.default.createElement(_ink.Box, {
        marginBottom: 0,
        flexDirection: "column",
        padding: 1
      }, _react.default.createElement(_ink.Text, null, "Min: ", minVolume), _react.default.createElement(_ink.Text, null, "Max: ", maxVolume)), _react.default.createElement(_ink.Box, {
        padding: 1,
        flexDirection: "column"
      }, _react.default.createElement(_ink.Text, null, "Volume: ", volume), _react.default.createElement(_ink.Text, null, "VolumeState: ", volumeState)), _react.default.createElement(_ink.Box, {
        padding: 1,
        flexDirection: "column"
      }, _react.default.createElement(InvalidKeys, {
        keys: invalidKeys
      })), showResetIndicator ? _react.default.createElement(_ink.Box, {
        padding: 1,
        flexDirection: "column"
      }, _react.default.createElement(_ink.Color, {
        bgRed: true,
        white: true,
        bold: true
      }, "\xA0*RESET*\xA0")) : null);
    }
  }]);

  return VolumeSelect;
}(_react.default.Component);

function InvalidKeys(props) {
  var _props$keys = props.keys,
      keys = _props$keys === void 0 ? [] : _props$keys;
  if (keys.length === 0) return null;
  return keys.map(function (k, i) {
    return _react.default.createElement(_ink.Box, null, _react.default.createElement(_ink.Color, {
      key: i,
      bgRed: true,
      white: true
    }, "Invalid key bruh \xAF\\_(\u30C4)_/\xAF"));
  });
}

(0, _ink.render)(_react.default.createElement(VolumeSelectWrapper, null));