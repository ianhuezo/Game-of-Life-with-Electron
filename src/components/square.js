import React from 'react';
import classnames from 'classnames';

class Square extends React.Component{
  render(){
    return(
      <div className = {classnames('square', this.props.alive)} onClick={() => this.props.onClick()}>
      </div>
    );
  }
}

export default Square
