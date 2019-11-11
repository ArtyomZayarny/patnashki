import React, {Component} from 'react';
import './App.css';
//import Store from './store'
import {createStore} from "./redux";


const initialState = { count: 0 };

// function updateState(state,action) {
//     switch (action.type) {
//         case 'INCREMENT':return {count: this.state.count + action.amount};
//         case 'DECREMENT':return {count: this.state.count - action.amount};
//         case 'RESET':return {count: 0};
//         default: return state
//     }
// }
function reducer(state = {count: 0},action) {
    switch (action.type) {
        case 'INCREMENT':return {count: state.count + action.amount};
        case 'DECREMENT':return {count: state.count - action.amount};
        case 'RESET':return {count: 0};
        default: return state
    }
}


// const incrementAction = {type:'INCREMENT', amount:1};
// const decrementAction = {type:'DECREMENT', amount:1};
// const resetAction = {type:'RESET'};

function increment(amount) {
    return {type: 'INCREMENT', amount}
}
function decrement(amount) {
    return {type: 'DECREMENT', amount}
}

function reset() {
    return {type:'RESET'}
}

// const store = new Store(updateState, initialState);
 const store = createStore(reducer);


class App extends Component{
    constructor(props){
        super(props)
    }
    componentDidMount() {
        store.subscribe(()=> this.forceUpdate())
    }

    decrease = () => {
        let amount = parseInt(this.refs.amount.value || 1);
        store.dispatch(decrement(amount))
    }
    increase = () => {
        let amount = parseInt(this.refs.amount.value || 1);
        store.dispatch(increment(amount))
    }
    reset = () => {
        store.dispatch(reset())
    }
    render() {
        const count = store.getState().count;
        return (
            <div className="App">
                <div>{count}</div>
                <button onClick={this.decrease}>-</button>
                <button onClick={this.reset}>Reset</button>
                <button onClick={this.increase}>+</button>
                <input type="text" ref="amount" defaultValue='1'/>
            </div>
        );
    }

}

export default App;
