import React from 'react';
import './App.css';

import { rollOn } from './utils'
import ship from './data/ships'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ship: rollOn(ship),
    }
  }

  render() {
    return (
      <div>
        <span>This ship is a {this.state.ship.title}.</span>
      </div>
    );
  }
}

// ========================================

export default App;
