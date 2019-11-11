import React, {Component} from 'react'
import {createStore} from "../redux";


function reducer(state = {backgroundColor: '#ccc'},action) {
    switch (action) {
       case 'red': return {backgroundColor: 'red'};
       case 'aqua': return {backgroundColor: 'aqua'};
       default:return state
   }
}

const store = createStore(reducer);

function selectColor(color) {
    return color
}

class Game extends Component {

    constructor() {
        super();

        this.state = {
           empty: {row:4,col:4,val:''}
        }


    }

    componentDidMount() {
        store.subscribe(()=> this.forceUpdate())
    }


    changeColor = (color) => {
        store.dispatch(selectColor(color))
    }


    canGo = (el) => {
       let empty = this.state.empty;
        // console.log(el);
        // console.log(empty);

       if ((empty.col - el.col ===  1 && empty.row === el.row) ||  // move horizontally left
           (empty.col - el.col === -1 && empty.row === el.row) ||  // move horizontaly right
           (empty.row - el.row ===  1 && el.col === empty.col) || // move vertically up
           (empty.row - el.row === -1 && el.col === empty.col) //move vertically down
       ) {
           return true
       }


    }
    handleAction = (curEl) => {
        console.log(curEl);
        console.log(this.state.empty);

        if (this.canGo(curEl)) {
            this.setState({
                empty:curEl
            })
        }

    }

    isEmpty = (el) => {
        let empty = '';
        let state = this.state.empty;

        if (el.row === state.row && el.col === state.col ) {
            empty = 'empty'
        }
        return empty
    }

    render() {
        const color = store.getState();
        return (
            <div>
                <div className="board" style={color}>
                    <div className="row">
                        <div className="square" data-empty={this.isEmpty({row:1,col:1})} onClick={()=>{this.handleAction({row:1, col:1})}}></div>
                        <div className="square" data-empty={this.isEmpty({row:1,col:2})} onClick={()=>{this.handleAction({row:1, col:2})}}></div>
                        <div className="square" data-empty={this.isEmpty({row:1,col:3})} onClick={()=>{this.handleAction({row:1, col:3})}}></div>
                        <div className="square" data-empty={this.isEmpty({row:1,col:4})} onClick={()=>{this.handleAction({row:1, col:4})}}></div>
                    </div>
                    <div className="row">
                        <div className="square" data-empty={this.isEmpty({row:2,col:1})} onClick={()=>{this.handleAction({row:2, col:1})}}></div>
                        <div className="square" data-empty={this.isEmpty({row:2,col:2})} onClick={()=>{this.handleAction({row:2, col:2})}}></div>
                        <div className="square" data-empty={this.isEmpty({row:2,col:3})} onClick={()=>{this.handleAction({row:2, col:3})}}></div>
                        <div className="square" data-empty={this.isEmpty({row:2,col:4})} onClick={()=>{this.handleAction({row:2, col:4})}}></div>
                    </div>
                    <div className="row">
                        <div className="square" data-empty={this.isEmpty({row:3,col:1})} onClick={()=>{this.handleAction({row:3, col:1})}}></div>
                        <div className="square" data-empty={this.isEmpty({row:3,col:2})} onClick={()=>{this.handleAction({row:3, col:2})}}></div>
                        <div className="square" data-empty={this.isEmpty({row:3,col:3})} onClick={()=>{this.handleAction({row:3, col:3})}}></div>
                        <div className="square" data-empty={this.isEmpty({row:3,col:4})} onClick={()=>{this.handleAction({row:3, col:4})}}></div>
                    </div>
                    <div className="row">
                        <div className="square" data-empty={this.isEmpty({row:4,col:1})} onClick={()=>{this.handleAction({row:4, col:1})}}></div>
                        <div className="square" data-empty={this.isEmpty({row:4,col:2})} onClick={()=>{this.handleAction({row:4, col:2})}}></div>
                        <div className="square" data-empty={this.isEmpty({row:4,col:3,val:13})} onClick={()=>{this.handleAction({row:4, col:3})}}></div>
                        <div className="square" data-empty={this.isEmpty({row:4,col:4,val:16})} onClick={()=>{this.handleAction({row:4, col:4})}}></div>
                    </div>
                </div>
                <button className='red circle' onClick={() => {this.changeColor('red')}}></button>
                <button className='aqua circle' onClick={() => {this.changeColor('aqua')}}></button>
            </div>


            )

    }
}

export default Game