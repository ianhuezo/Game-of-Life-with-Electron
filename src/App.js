import React, { Component } from 'react';
import Grid from './components/grid'

class App extends Component {
  render() {
    return (
      <div>
        <h1> Game of Life </h1>
        <Grid />
      </div>
    );
  }
}

export default App;
