import React, { useState } from 'react';
import _ from "lodash";

import ModuleDescription from './ModuleDescription';

import * as utils from './utils';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faGamepad, faFan, faServer, faBomb, faRocket, faIndustry, faLemon, faChessKnight, faBed, faPrescriptionBottleAlt, faMicroscope, faIcicles, faDumpsterFire, faBoxes, faLevelDownAlt, faLevelUpAlt, faBoxOpen, faUserAstronaut } from '@fortawesome/free-solid-svg-icons';

import './App.css';

import roomStyles from './data/room_styles';
import weapons from './data/weapons';

library.add(fab, faGamepad, faFan, faServer, faBomb, faRocket, faIndustry, faLemon, faChessKnight, faBed, faPrescriptionBottleAlt, faMicroscope, faIcicles, faDumpsterFire, faBoxes, faLevelDownAlt, faLevelUpAlt, faBoxOpen, faUserAstronaut);

export default function Module(props) {
  const [inHover, setHover] = useState(false);
  
  let descStr = null;
  if (props.item.title === 'Weapon') {
    descStr = props.item.description + ' (' + utils.rollOn(weapons).title + ').';
  } else {
    descStr = props.item.description;
  }

  let connectionUp = false;
  let connectionDown = false;
  _.forEach(props.item.connection, function(c) {
    if ( c.type === 'up' ) { connectionUp = true; }
    if ( c.type === 'down' ) { connectionDown = true; }
  });

  let equipment = false;
  if (_.has(props.item, 'equipment') && props.item.equipment.length > 0) {
    equipment = true;
  }

  let survivors = false;
  if (_.has(props.item, 'survivors') && props.item.survivors.length > 0) {
    survivors = true;
  }

  return (
    <div className='crt module'>
      <div 
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onMouseDown={() => setHover(false)}
        onMouseUp={() => setHover(true)}
        style={{}}
      >
        <div className='module-icon-row'>
          <FontAwesomeIcon icon={roomStyles[props.item.title]} />
        </div> 
        <div className='module-icon-row'>
          { connectionUp && <FontAwesomeIcon className='module-icon' icon='level-up-alt' size='sm' /> }
          { connectionDown && <FontAwesomeIcon className='module-icon' icon='level-down-alt' size='sm' /> }
          { equipment && <FontAwesomeIcon className='module-icon' icon='box-open' size='sm' /> }
          { survivors && <FontAwesomeIcon className='module-icon' icon='user-astronaut' size='sm' /> }
        </div>
      </div>
      {inHover && <ModuleDescription title={props.item.title} description={descStr} equipment={props.item.equipment} survivors={props.item.survivors} />}
    </div>
  );
}