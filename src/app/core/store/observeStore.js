'use strict';

export default function observeStore(store, select, onChange, repeat=false) {
  let currentState;

  function handleChange() {
    let nextState = select(store.getState());
    if (nextState !== currentState || repeat) {
      currentState = nextState;
      onChange(currentState);
    }
  }

  let unsubscribe = store.subscribe(handleChange);
  handleChange();
  return unsubscribe;
}
