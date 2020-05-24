import _ from "lodash";

import * as utils from './utils';

import modules from './data/modules';

export function generateModuleContents(items) {
  return _.map(_.range(items), function(i) {
    return utils.rollOn(modules[utils.roll(6)]);
  });
}