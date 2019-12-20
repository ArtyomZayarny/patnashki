import React, {Component} from 'react';
import Squares from "./Squares";



function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
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
        this.state = {
            board: this.board,
            white:'',
        }
    }

    componentDidMount() {
       const board = this.state.board;
       const whiteCoordinaate = board.filter( (obj) => {
          if (obj[Object.keys(obj)[0]] === 16) {
              return Object.keys(obj)[0]
          }
       })
   
       this.setState({
           white:whiteCoordinaate
       });
    }
   

    getCoordinate = (cord,white,board,num) => {
        let request = cord.split('');

        let curWhite = Object.keys(white[0]);
         let emptyCord = curWhite[0].split('');
       
         let cords = {
             a:0,
             b:1,
             c:2,
             d:3
         }
        if (emptyCord[0] === request[0]) {
            
           
           // gorizontallly moves
            if (Math.abs(emptyCord[1] - request[1]) === 1) {
               console.log(board)
                let newBoard = board.map( (item) => {
                    let requestVal = `${num}`;
                    let requestCord = `${cord}`;
                    if (item[`${cord}`]) {
                            let newWhite = {};
                            newWhite[`${cord}`] = 16;
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
                    board:newBoard
                })

          
            } else {
                console.log('Can\'t go');
            }

        } else if(emptyCord[1] === request[1]) {
            let xEmpty = emptyCord[0];
            let xRequest = request[0]

            if (Math.abs(cords[xRequest] - cords[xEmpty]) === 1) {
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
    


        return(
            <div>
                <Squares white={this.state.white} handleClick={this.getCoordinate} data={this.state.board}/>
            </div>

                )

    }
}
export default Game
