import React, {Component} from 'react';
import Squares from "./Squares";



function shuffle(array) {
    let arr = array.slice();
    return arr.sort(() => Math.random() - 0.5);
}
function Board(arr) {
    let letter = ['a','b','c','d'];
    let coordinate = [];

    for( let i = 0; i < arr.length; i++) {
        let obj = {};
          switch(i) {
              case 0:
              case 1:
              case 2:
              case 3: 
              obj[`${letter[0]}${ i % 4}`] = arr[i]
              coordinate.push(obj);
              break;

              case 4:
              case 5:
              case 6:
              case 7:
              obj[`${letter[1]}${ i % 4}`] = arr[i]
              coordinate.push(obj);
              break;

              case 8:
              case 9:
              case 10:
              case 11:
              obj[`${letter[2]}${ i % 4}`] = arr[i]
              coordinate.push(obj);
              break;

              case 12:
              case 13:
              case 14:
              case 15: 
              obj[`${letter[3]}${ i % 4}`] = arr[i]
              coordinate.push(obj);
              break;
          }
      }

    return coordinate
}

class Game extends Component {
    constructor() {
        super()
        this.initBoard = Array.from(Array(16), (item,index) => index + 1);      
        this.shuffled = shuffle(this.initBoard);
        this.board = Board(this.shuffled)
        this.white = this.board.filter( (obj) => {
                  if (obj[Object.keys(obj)[0]] === 16) {
                      return Object.keys(obj)[0]
                  }
                });
        this.state = {
            board: this.board,
            white:this.white,
            win:false
        }
    }

    canGo = (board,request,curWhite,requestVal) => {
        let newWhite = {};
        let newBoard = board.map( (item) => {
            
            if (item[`${request}`]) { 
                    newWhite[`${request}`] = 16;
                    return newWhite
            } 
            if (item[`${curWhite}`]) {
                let newItem = {};
                newItem[`${curWhite}`] = +requestVal;
                return newItem
            } 
                return item
        });
        this.setState({
            board:newBoard,
            white:[newWhite]
        })
       }
    getCoordinate = (cord,white,board,num) => {
        let request = cord.split('');

        let curWhite = Object.keys(white[0]);
         let emptyCord = curWhite[0].split('');
         let cords = {a:0,b:1,c:2,d:3}
         let requestVal = `${num}`;
         let requestCord = `${cord}`;

        if (emptyCord[0] === request[0]) {
           console.log(`Change by row`);
           // gorizontallly moves
           console.log(`emtycord:${emptyCord[1]}  Request:${request[1]}`);
            if (Math.abs(emptyCord[1] - request[1]) === 1) {
               console.log(board)
               this.canGo(board,requestCord,curWhite,requestVal);
                        
            } else {
                console.log('Can\'t go');
            }
        } else if(emptyCord[1] === request[1]) {
            let xEmpty = emptyCord[0];
            let xRequest = request[0]

            if (Math.abs(cords[xRequest] - cords[xEmpty]) === 1) {
                //vertically move
                this.canGo(board,requestCord,curWhite,requestVal);
                console.log('Go')
            } else {
                console.log('Can\'t go');
            }
            
            
        } else {
            console.log('Can\'t go');
        }
        
      console.log(`Request -- ${cord}:${num}  --- White is ${curWhite} `)

            
    }

    render() {
    let boardObj = this.state.board;
    let boardArr = [];

    boardObj.forEach( (obj) => {
        let key = Object.keys(obj)[0];
        boardArr.push(obj[key]);
    });
    let initBoard =    JSON.stringify(this.initBoard);
    let currentBoard = JSON.stringify(boardArr);
    if (initBoard === currentBoard) {
        this.setState({
            win:true
        })
    }
    let finish = this.state.win ? <h1>Finish GAME!</h1> : '';
    return(
        <div> 
            { finish }
                <Squares white={this.state.white} handleClick={this.getCoordinate} data={this.state.board}/>   
        </div>

            )

    }
}
export default Game
