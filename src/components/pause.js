import React, {Component} from 'react';

class Pause extends Component{
  render(){
    return(
      <button onClick={()=>this.props.onClick()} className = "btn">Pause</button>
    );
  }
}

export default Pause;
