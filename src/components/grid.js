import React, {Component} from 'react';
import Square from './square';
import Clear from './clear';
import Start from './start';
import Pause from './pause';

class Grid extends Component{

  constructor(){
    //set the original state for the squares
    super();
    let myArr = [];
    let position = [];
    let aliveOrDead;
    let counter = 0;
    const min = Math.ceil(0);
    const max = Math.floor(1);
    for(let i = 0; i < 70; i++)//cols
    {
      for(let j = 0; j < 50; j++)//rows
      {
        aliveOrDead = Math.random() * (max - min) + min;//decide fate
        if(aliveOrDead > 0.5)
        {
          myArr.push('alive');//alive :)
          position.push(counter);
        }
        if(aliveOrDead <= 0.5)//dead :(
        {
          myArr.push('dead');
          position.push(counter);
        }
        counter++;
      }
    }
    this.state = {
      units: myArr,
      position: position,
      pause: false,
      counter: 0,
      clear: false,
    }
  }


  isValid(position,actual, key){//found this great stackoverflow for tracking my bounds, modified it to fit my needs
        let inbounds = (size, index) => {
                return (index >= 0 && index < size);
        };
        if (!inbounds(3500, position)) {
          return 0;
        }
        if(key === 1){
          if((position+1) % 70 === 0){
            return 0;
          }
        }
        if(key === 0){
          if((actual+1) % 70 === 0){
            return 0;
          }
        }
        if(key === 2){
          if(position%70 === 0){
            return 0;
          }
        }
        if(key === 3){
          if((position+1)%70 === 0){
            return 0;
          }
        }
        if(key === 6){
          if((position + 1)%70 === 0){
            return 0;
          }
        }
        if(key === 7){
          if((position)%70 === 0){
            return 0;
          }
        }

        return (this.state.units[position] === 'alive') ? 1 : 0;
    };
  totalNeighbor(position){
      var total = 0;

      total += this.isValid(position+1,position, 0);
      total += this.isValid(position-1,position, 1);
      total += this.isValid(position-69,position,2);
      total += this.isValid(position+69,position,3);
      total += this.isValid(position+70,position,4);
      total += this.isValid(position-70,position,5);
      total += this.isValid(position-71,position,6);
      total += this.isValid(position+71,position,7);
      return total;
  };

  updateGrid(grid){
    /*
    Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
    Any live cell with two or three live neighbours lives on to the next generation.
    Any live cell with more than three live neighbours dies, as if by overpopulation.
    Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
    */
    let newArr = grid;
    let newUnit;
    let neighborCount = [];
    for(let i = 0; i < grid.length; i++){
      neighborCount.push(this.totalNeighbor(i))
    }
    grid.map((unit,i)=>{
      if(unit === 'alive' && (neighborCount[i] < 2)){
        newUnit = 'dead';
        newArr[i] = newUnit;
      }
      else if((unit === 'alive' && neighborCount[i] === 2) || (unit === 'alive' && neighborCount[i] === 3)){
        newUnit = 'alive';
        newArr[i] = newUnit;
      }
      else if(unit === 'alive' && neighborCount[i] > 3){
        newUnit = 'dead';
        newArr[i] = newUnit;
      }
      else if(unit=== 'dead' && neighborCount[i] === 3){
        newUnit = 'alive';
        newArr[i] = newUnit;
      }
      else{
        newUnit = 'dead';
        newArr[i] = newUnit;
      }
    })
    return newArr;
  }

  componentDidMount(){
    let grid = this.state.units;
    let counter;
    let updatedGrid;
      this.interval = setInterval(()=>{
        if(this.state.pause === false){
        updatedGrid = this.updateGrid(grid);
        this.setState({units: updatedGrid})
        if(this.state.clear === false){
          counter = this.state.counter;
          counter++;
        }
        else if(this.state.clear === true){
          counter = this.state.counter
          counter = 0;
        }
        this.setState({counter: counter})
        }
      },1000);
  }

  componentWillUnmount(){
    if(this.state.pause === false){
      clearInterval(this.interval());
    }
  }

  handleClick(unit,i){
    let grid = this.state.units
    if(unit === 'dead'){
      grid[i] = 'alive';
      this.setState({units: grid})
    }
    else if(unit === 'alive'){
      grid[i] = 'dead';
      this.setState({units: grid})
    }
  }
  clear(){
    let grid = this.state.units;
    for(let i = 0; i < grid.length; i++){
      if(grid[i] === 'alive'){
        grid[i] = 'dead';
      }
    }
    this.setState({units: grid, pause: true, counter: 0, clear: true});
  }
  startClick(){
    if(this.state.clear === true){
      this.setState({pause: false, clear: false})
    }
    else if(this.state.clear === false){
      this.setState({pause: false})
    }
  }
  pauseClick(){
    let pause = this.state.pause;
    pause = !pause;
    this.setState({pause: pause});
  }
  render(){
    return(
      <div className = 'container'>
        <div className = "grid">
          <div>
          {this.state.units.map((unit,i)=>{
            return <Square alive={unit} key={this.state.position[i]} onClick={() => this.handleClick(unit,i)}/>
          })}
          </div>
        </div>
        <div className = "all-btn">
          <div className = "clear-btn">
            <Clear onClick={() => this.clear()}/>
          </div>
          <div className = "start-btn">
            <Start onClick={() => this.startClick()}/>
          </div>
          <div className = "pause-btn">
            <Pause onClick={()=>this.pauseClick()} />
          </div>
        </div>
        <div className = "counter">
          <h1> Generations: {this.state.counter} </h1>
        </div>
      </div>
    );
  }
}

export default Grid
