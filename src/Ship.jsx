import _ from "lodash";

import ModuleLayout from './ModuleLayout';

import * as utils from './utils';

import ships from './data/ships';
import habitable from './data/habitable';
import survivors from './data/survivors';
import systems from './data/systems';
import salvage from './data/salvage';
import ruination from './data/ruination';
import weird from './data/weird';
import modules from './data/modules';
import cargo from './data/cargo';
import weapons from './data/weapons';

export default class Ship {
	constructor() {
    let tableItem = utils.rollOn(ships);

    this.title = tableItem.title;
    this.moduleNumber = tableItem.module_number;
    this.levelNumber = tableItem.level_number;
    this.extraLevels = tableItem.extra_levels ? utils.numberOfExtraLevels(1, 0) : 0;

    this.traits = {
      habitability: utils.rollOn(habitable),
      systems: utils.rollOn(systems),
      salvageGeneral: utils.rollOn(salvage.general),
      salvageMaterial: utils.rollOn(salvage.material),
      ruination: utils.rollOn(ruination),
      weird: utils.rollOn(weird)
    };
    this.initSalvage();

    this.equipment = {};
    this.survivors = {};

    this.generateModuleContents();
    this.setShipEquipment();
    this.setShipSurvivors();

    this.moduleLayout = (new ModuleLayout(this.moduleNumber)).layout;
  }

  generateModuleContents() {
    let self = this; 
    this.moduleContents = _.map(_.range(self.moduleNumber), function(i) {
      return utils.rollOn(modules[utils.roll(6)]);
    });
    this.prepareModuleContents();
  }

  prepareModuleContents() {
    let self = this;
    this.moduleContents = _.map(self.moduleContents, function(m) {
      return self.initModuleSurvivors(self.initModuleEquipment(m));
    });
  }

  initModuleEquipment(module) {
    let newEquipment = [];
    _.forEach(module.equipment, function(e) {
      switch (e.title) {
        case 'Cargo':
          let cargoItem = utils.rollOn(cargo);

          // Is Cargo survivors, or possibly survivors?
          switch (cargoItem.title) {
            case 'Anthropology Mission':
            case 'Botanists/Horticulturists':
            case 'Industrial Engineers/Architects':
            case 'Prisoners':
            case 'Census Takers':
            case 'Refugees (Maybe Make This an Alien Prisoner)':
            case 'Legionaries (Guns & Ammo)':
            case 'Religious Pilgrims (Religious Texts & Symbols)':
              // Definitely survivors
              if (!_.has(module, 'survivors')) {
                module.survivors = [];
              }

              module.survivors.push({ 
                title: cargoItem.title, 
                units: _.has(cargoItem, 'units') ? cargoItem.units : e.units 
              });
              break;
            default:
              newEquipment.push({ 
                title: cargoItem.title,
                units: utils.diceRoll( _.has(cargoItem, 'units') ? cargoItem.units : e.units ) 
              });
          }
          break;
        case 'Weapon Cache':
          newEquipment.push({ 
            title: e.title,
            units: utils.diceRoll(e.units)
          });
          break;
        default:
          newEquipment.push({ 
            title: e.title,
            units: utils.diceRoll(e.units)
          });
      }
    });
    module.equipment = newEquipment;
    return module;
  }

  initModuleSurvivors(module) {
    module.survivors = _.map(module.survivors, function(s) {
      return { title: s.title, units: utils.diceRoll(s.units) };
    });
    return module;
  }

  initSalvage() {
    if (this.traits.salvageGeneral === 'Weapon') {
      this.traits.salvageGeneral = {
        title: utils.rollOn(weapons).title,
        units: utils.diceRoll(this.traits.salvageGeneral.units)
      };
    } else {
      this.traits.salvageGeneral = {
        title: this.traits.salvageGeneral.title,
        units: utils.diceRoll(this.traits.salvageGeneral.units)
      };
    }
    
    if (this.traits.salvageMaterial === 'Cargo') {
      let cargoItem = utils.rollOn(cargo);

      this.traits.salvageMaterial = {
        title: cargoItem.title,
        units: utils.diceRoll( _.has(cargoItem, 'units') ? cargoItem.units : this.traits.salvageMaterial.units )
      };
    } else {
      this.traits.salvageMaterial = {
        title: this.traits.salvageMaterial.title,
        units: utils.diceRoll(this.traits.salvageMaterial.units)
      };
    }

  }

  setShipEquipment() {
    let self = this;

    this.equipment = {};

    _.forEach(this.moduleContents, function(m) {
      _.forEach(m.equipment, function(e) {
        if (_.has(self.equipment, e.title)) {
          self.equipment[e.title] += e.units;
        } else {
          self.equipment[e.title] = e.units;
        }
      })
    });

    // Todo: Check salvage
    if (_.has(self.equipment, self.traits.salvageGeneral.title)) {
      self.equipment[self.traits.salvageGeneral.title] += 
        self.traits.salvageGeneral.units;
    } else {
      self.equipment[self.traits.salvageGeneral.title] = 
        self.traits.salvageGeneral.units;
    }

    if (_.has(self.equipment, self.traits.salvageMaterial.title)) {
      self.equipment[self.traits.salvageMaterial.title] += 
        self.traits.salvageMaterial.units;
    } else {
      self.equipment[self.traits.salvageMaterial.title] = 
        self.traits.salvageMaterial.units;
    }

    // Todo: intact/salvageable systems outside of salvage table?
  }

  setShipSurvivors() {
    let self = this;

    this.survivors = {};

    let tableEntry = utils.rollOn(survivors);
    _.forEach(tableEntry.survivors, function(s) {
      self.survivors[s.title] = utils.diceRoll(s.units);
    });    

    _.forEach(this.moduleContents, function(m) {
      _.forEach(m.survivors, function(s) {
        if (_.has(self.survivors, s.title)) {
          self.survivors[s.title] += s.units;
        } else {
          self.survivors[s.title] = s.units;
        }
      })
    });

    // Todo: Survivors from cargo?
  }
}