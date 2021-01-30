// @ts-nocheck

class State {
  state: Array<Array<Piece>>;

  constructor() {
    this.state = [];
  }

  updateState(state: Array<Piece>) {
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

  getAnyState(move: Piece[]) {
    return this.state.filter((m) => m !== move);
  }
}
