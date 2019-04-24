import { EVENTS } from "./constants";

export function eventsArrayToMap(eventArray) {
  return eventArray.reduce((decoratedEvents, event) => {
    switch (event) {
      case EVENTS.INCREASE:
        return {
          ...decoratedEvents,
          [EVENTS.INCREASE]: EVENTS.INCREASE
        };
      case EVENTS.DECREASE:
        return {
          ...decoratedEvents,
          [EVENTS.DECREASE]: EVENTS.DECREASE
        };
      default:
        return decoratedEvents;
    }
  }, {});
}
