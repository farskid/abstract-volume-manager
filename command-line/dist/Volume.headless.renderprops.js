"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VolumeHeadlessRenderProps = void 0;

var _react = _interopRequireDefault(require("react"));

var _xstate = require("xstate");

var _volume = require("./volume.states");

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

var VolumeHeadlessRenderProps =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(VolumeHeadlessRenderProps, _React$PureComponent);

  function VolumeHeadlessRenderProps() {
    var _this;

    _classCallCheck(this, VolumeHeadlessRenderProps);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(VolumeHeadlessRenderProps).call(this));

    _this.increase = function () {
      var nextState = _this.machine.transition(_this.state.volumeState, "INCREASE");

      var nextComponentState = _this.machineToComponentState(nextState);

      _this.setState(nextComponentState);
    };

    _this.decrease = function () {
      var nextState = _this.machine.transition(_this.state.volumeState, "DECREASE");

      var nextComponentState = _this.machineToComponentState(nextState);

      _this.setState(nextComponentState);
    };

    _this.reset = function () {
      _this.setState(_this.machineToComponentState(_this.machine.initialState));
    };

    _this.machine = (0, _xstate.Machine)(_volume.volumeStatechart);
    var initialState = _this.machine.initialState;
    _this.state = _this.machineToComponentState(initialState);
    _this.maxVolume = (0, _volume.volumeStateToValue)(Object.keys(_volume.volumeStatechart.states).pop());
    _this.minVolume = (0, _volume.volumeStateToValue)(Object.keys(_volume.volumeStatechart.states));
    return _this;
  }

  _createClass(VolumeHeadlessRenderProps, [{
    key: "eventsToActions",
    value: function eventsToActions(eventArray) {
      return eventArray.reduce(function (decoratedEvents, event) {
        switch (event) {
          case "INCREASE":
            return _objectSpread({}, decoratedEvents, {
              INCREASE: "INCREASE"
            });

          case "DECREASE":
            return _objectSpread({}, decoratedEvents, {
              DECREASE: "DECREASE"
            });

          default:
            return decoratedEvents;
        }
      }, {});
    }
  }, {
    key: "machineToComponentState",
    value: function machineToComponentState(machineState) {
      var value = machineState.value,
          nextEvents = machineState.nextEvents;
      return {
        volume: (0, _volume.volumeStateToValue)(value),
        volumeState: value,
        actions: this.eventsToActions(nextEvents)
      };
    }
  }, {
    key: "render",
    value: function render() {
      var state = this.state,
          maxVolume = this.maxVolume,
          minVolume = this.minVolume,
          increase = this.increase,
          decrease = this.decrease,
          reset = this.reset;
      var volume = state.volume,
          volumeState = state.volumeState,
          actions = state.actions;
      return this.props.children({
        maxVolume: maxVolume,
        minVolume: minVolume,
        volume: volume,
        volumeState: volumeState,
        actions: actions,
        increase: increase,
        decrease: decrease,
        reset: reset
      });
    }
  }]);

  return VolumeHeadlessRenderProps;
}(_react.default.PureComponent);

exports.VolumeHeadlessRenderProps = VolumeHeadlessRenderProps;