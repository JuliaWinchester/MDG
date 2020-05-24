import React from 'react';
import ModuleGroup from './ModuleGroup';
import ReactResizeDetector from 'react-resize-detector';

import './App.css';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import * as utils from './utils';
import * as moduleLayout from './layout';
import * as moduleContents from './moduleContents';

import ships from './data/ships';
import habitable from './data/habitable';
import survivors from './data/survivors';
import systems from './data/systems';
import salvage from './data/salvage';
import ruination from './data/ruination';
import weird from './data/weird';

function Description(props) {
  return (
    <div>
      <div>This ship is a {props.ship.title}.</div>
      <div>It has {props.shipModuleNumber} modules per level.</div>
      <div>There {props.shipLevels > 1 ? 'are' : 'is'} {props.shipLevels} standard level{props.shipLevels === 1 ? '' : 's'} and {props.extraLevels} extra level{props.extraLevels === 1 ? '' : 's'}.</div>
      <div>The ship is {props.habitability.title} with {utils.diceRoll(props.survivors.content.survivor_number)} {props.survivors.title}.</div>
      <div>Systems status is: {props.systems.title}.</div>
      <div>Salvageable equipment includes {utils.diceRoll(props.salvageGeneral.content.units)} {props.salvageGeneral.title} and salvageable material includes {utils.diceRoll(props.salvageMaterial.content.units)} units of {props.salvageMaterial.title}.</div>
      <div>This ship became a derelict due to {props.ruination.title}. But what's weird about it is {props.weird.title}?</div>
    </div>
  ); 
}

class App extends React.Component {
  constructor(props) {
    super(props);
    let ship = utils.rollOn(ships);

    this.state = {
      ship: ship,
      shipModuleNumber: ship.content.module_number,
      shipLevels: ship.content.level_number,
      extraLevels: ship.content.extra_levels ? utils.numberOfExtraLevels(1, 0) : 0,
      habitability: utils.rollOn(habitable),
      survivors: utils.rollOn(survivors),
      systems: utils.rollOn(systems),
      salvageGeneral: utils.rollOn(salvage.general),
      salvageMaterial: utils.rollOn(salvage.material),
      ruination: utils.rollOn(ruination),
      weird: utils.rollOn(weird),
      moduleLayout: moduleLayout.generateModuleLayout(ship.content.module_number),
      moduleContents: moduleContents.generateModuleContents(ship.content.module_number)
    }
  }

  render() {
    return (
      <div>
        <Description
          ship={this.state.ship}
          shipModuleNumber={this.state.shipModuleNumber}
          shipLevels={this.state.shipLevels}
          extraLevels={this.state.extraLevels}
          habitability={this.state.habitability}
          survivors={this.state.survivors}
          systems={this.state.systems}
          salvageGeneral={this.state.salvageGeneral}
          salvageMaterial={this.state.salvageMaterial}
          ruination={this.state.ruination}
          weird={this.state.weird}
        />
        <br />
        <ReactResizeDetector
          handleWidth
          handleHeight
          render={({ width, height }) => (
            <ModuleGroup 
              cols={12} 
              rowHeight={Math.ceil(width/12) - 10}
              items={this.state.moduleContents}
              layout={this.state.moduleLayout}
            />
          )}
        />
      </div>
    );
  }
}

// ========================================

export default App;
