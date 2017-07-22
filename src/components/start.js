import React, {Component} from 'react';

class Start extends Component{
  render(){
    return(
      <button onClick={()=>this.props.onClick()} className = "btn">Start</button>
    );
  }
}
export default Start
