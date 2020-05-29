import React from 'react';
import ReactResizeDetector from 'react-resize-detector';
import { Grid, Row, Col } from 'react-flexbox-grid';

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
    list.push(key + ' (' + units + ')');
  });

  if (list.length) {
    return (
      <div>
        <span>{ list.join(', ') }</span>
      </div>
    );
  } else {
    return (
      <div>
        <span>{ props.emptyMsg }</span>
      </div>
    );
  }
}

function Description(props) {
  return (
    <div>
      <div>Class: {props.ship.title}</div>
      <div>Modules Per Level: {props.ship.moduleNumber}</div>
      <div>Levels: {props.ship.levelNumber}</div>
      <div>Systems Status: {props.ship.traits.systems.title}.</div>
      <div>Cause of Ruination: {props.ship.traits.ruination.title}</div>
      <div>Strange Quirk: {props.ship.traits.weird.title}</div>
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
      <div className='crt crt-style'>
        <Grid fluid>
          <Row>
            <Col xs={3}>
              <GenerateShipButton
                onClick={(e) => this.handleGenerateShipClick(e)}
              />
              <Description
                ship={this.state.ship}
              />
            </Col>
            <Col xs={3}>
              <b>Equipment</b>
              <ItemUnitsList items={this.state.ship.equipment} emptyMsg={'Empty!'} />
            </Col>
            <Col xs={3}>
              <b>Survivors</b>
              <ItemUnitsList items={this.state.ship.survivors} emptyMsg={'None'} />
            </Col>
            <Col xs={3}>
              <ShipProfile
                view='side'
                levels={this.state.shipLevels}
                cols={12}
              />
            </Col>
          </Row>
        </Grid>
        <ReactResizeDetector
              handleWidth
              handleHeight
              render={({ width, height }) => (
                <div>                
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
