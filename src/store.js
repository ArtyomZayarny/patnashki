function updateState(state, action) {
    if (action.type === 'INCREMENT') {
        return {count: state.count + action.amount};
    }else if (action.type === 'DECREMENT') {
        return {count: state.count - action.amount};
    } else {
        return state;
    }
}

class Store {
    constructor(updateState,state) {
        this._updateState = updateState;
        this._state = state;
        this._callbacks = [];
    }

    get state() {
        return this._state;
    }

    update(action) {
        this._state = this._updateState(this._state, action);
        this._callbacks.forEach( callback => callback());
    }

    subscribe(callback) {
        this._callbacks.push(callback);
        return () => this._callbacks = this._callbacks.filter( cb => cb !== callback )
    }

}
export  default Store