import React, {Component} from 'react';

const SquareItem = (props) => {
    const {
        num,
        cord,
        handleClick,
        white,
        board
    } = props;
    return(
        <li 
        board={board} 
        onClick={ () => {handleClick(cord,white,board,num)}}
          style={{backgroundColor: num === '16' ? '#fff' : '#000'}}
          >{num}
          </li>
    )
}

class Squares extends Component{
    constructor(props){
        super(props);
       
    }
   

    render() {
        const {
            data,
            handleClick,
            white
        } = this.props
      
        // let {data} = this.props;
        let list = data.map( (item) => {
      let coordinate = Object.keys(item);
      let value = item[coordinate[0]];
      return <SquareItem board={data} white={white} handleClick={handleClick}key={`${coordinate}`} cord={`${coordinate}`} num={`${value}`}/> 
  })
        return(
            <ul>
                {list}
            </ul>
        )
    }

}
export  default Squares