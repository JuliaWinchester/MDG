import React from 'react';
import ReactResizeDetector from 'react-resize-detector';
import _ from "lodash";

import ModuleGroup from './ModuleGroup';
import Ship from './Ship';
import ShipProfile from './ShipProfile';

import './App.css';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

function ShipLevel(props) {
  return (
    <div>
      <b>SHIP LEVEL {props.number + 1}</b>
      <ModuleGroup 
        key={props.number}
        cols={12} 
        rowHeight={Math.ceil(props.width/12) - 10}
        items={props.items}
        layout={props.layout}
      />
    </div>    
  );
}

function ShipLevels(props) {
  let levels = _.map(_.range(props.number), function(i) {
    return (
      <ShipLevel
        key={i}
        number={i} 
        width={props.width} 
        items={props.levels[i].modules}
        layout={props.levels[i].layout}
      />
    )
  });

  return (
    levels
  )
}

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

function GenerateShipButton(props) {
  return (
    <div>
      <button type="button" onClick={(e) => props.onClick(e)}>Generate New Ship</button>
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props);

    let ship = new Ship();
    this.state = {
      ship: ship,
      shipLevels: ship.levels
    }
  }

  handleGenerateShipClick(e) {
    e.preventDefault();
    let ship = new Ship();
    this.setState({
      ship: ship,
      shipLevels: ship.levels
    })
  }

  render() {
    return (
      <div>
        <GenerateShipButton
          onClick={(e) => this.handleGenerateShipClick(e)}
        />
        <Description
          ship={this.state.ship}
        />
        <br />
        <ReactResizeDetector
          handleWidth
          handleHeight
          render={({ width, height }) => (
            <div>
              <ShipProfile
                view='front'
                levels={this.state.shipLevels}
                cols={12} 
                width={width/2}
              />
              <ShipProfile
                view='side'
                levels={this.state.shipLevels}
                cols={12} 
                width={width/2}
              />
              <ShipLevels 
                number={this.state.ship.levelNumber}
                levels={this.state.ship.levels}
                width={width} 
              />
            </div>
          )}
        />
      </div>
    );
  }
}

// ========================================

export default App;
