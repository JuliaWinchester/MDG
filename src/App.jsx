import React from 'react';
import ReactResizeDetector from 'react-resize-detector';
import _ from "lodash";

import ModuleGroup from './ModuleGroup';
import Ship from './Ship';

import './App.css';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

function ItemUnitsList(props) {
  let list = [];
  _.forIn(props.items, function(units, key) { 
    list.push(<ul key={key}>{key} ({units})</ul>);
  });

  if (list.length) {
    return (
      list
    );
  } else {
    return ( 
      <span>{props.emptyMsg}</span>
    );
  }
}

function Description(props) {
  return (
    <div>
      <div>This ship is a {props.ship.title}.</div>
      <div>It has {props.ship.moduleNumber} modules per level.</div>
      <div>There {props.ship.levelNumber > 1 ? 'are' : 'is'} {props.ship.levelNumber} standard level{props.ship.levelNumber === 1 ? '' : 's'} and {props.ship.extraLevels} extra level{props.ship.extraLevels === 1 ? '' : 's'}.</div>
      <div>Systems status is: {props.ship.traits.systems.title}.</div>
      <div>This ship became a derelict due to {props.ship.traits.ruination.title}. But what's weird about it is {props.ship.traits.weird.title}?</div>
      <br />
      <b>Equipment</b>
      <ItemUnitsList items={props.ship.equipment} emptyMsg={'Empty!'} />
      <b>Survivors</b>
      <ItemUnitsList items={props.ship.survivors} emptyMsg={'None'} />
    </div>
  ); 
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ship: new Ship()
    }
  }

  render() {
    return (
      <div>
        <Description
          ship={this.state.ship}
        />
        <br />
        <ReactResizeDetector
          handleWidth
          handleHeight
          render={({ width, height }) => (
            <ModuleGroup 
              cols={12} 
              rowHeight={Math.ceil(width/12) - 10}
              items={this.state.ship.moduleContents}
              layout={this.state.ship.moduleLayout}
            />
          )}
        />
      </div>
    );
  }
}

// ========================================

export default App;
