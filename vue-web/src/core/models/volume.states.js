export const volumeValueToState = volumeValue => `V${volumeValue}`;
export const volumeStateToValue = volumeState => {
  const result = /V((\d){1,})/.exec(volumeState);

  return Array.isArray(result) ? result[1] : null;
};

export const volumeStatechart = {
  initial: "V50",
  states: {
    V0: {
      on: {
        INCREASE: "V10"
      }
    },
    V10: {
      on: {
        INCREASE: "V20",
        DECREASE: "V0"
      }
    },
    V20: {
      on: {
        INCREASE: "V30",
        DECREASE: "V10"
      }
    },
    V30: {
      on: {
        INCREASE: "V40",
        DECREASE: "V20"
      }
    },
    V40: {
      on: {
        INCREASE: "V50",
        DECREASE: "V30"
      }
    },
    V50: {
      on: {
        INCREASE: "V60",
        DECREASE: "V40"
      }
    },
    V60: {
      on: {
        INCREASE: "V70",
        DECREASE: "V50"
      }
    },
    V70: {
      on: {
        INCREASE: "V80",
        DECREASE: "V60"
      }
    },
    V80: {
      on: {
        INCREASE: "V90",
        DECREASE: "V70"
      }
    },
    V90: {
      on: {
        INCREASE: "V100",
        DECREASE: "V80"
      }
    },
    V100: {
      on: {
        DECREASE: "V90",
        INCREASE: "V110"
      }
    },
    V110: {
      on: {
        DECREASE: "V100",
        INCREASE: "V120"
      }
    },
    V120: {
      on: {
        DECREASE: "V100"
      }
    }
  }
};
