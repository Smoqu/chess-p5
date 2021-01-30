class State {
  constructor() {
    this.state = [];
  }

  updateState(state) {
    const deep = cloneDeep(state);

    this.state.push(deep);
  }

  getState() {
    return this.state;
  }

  getCurrentState() {
    return this.state[this.state.length - 1];
  }

  getPreviousState() {
    return this.state[this.state.length - 2];
  }

  getAnyState(move) {
    return this.state.filter((m) => m !== move);
  }
}
