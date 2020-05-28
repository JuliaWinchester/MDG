import React, { useState } from 'react';

import ModuleDescription from './ModuleDescription';

import * as utils from './utils';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faGamepad, faFan, faServer, faBomb, faRocket, faIndustry, faLemon, faChessKnight, faBed, faPrescriptionBottleAlt, faMicroscope, faIcicles, faDumpsterFire, faBoxes } from '@fortawesome/free-solid-svg-icons';

import './App.css';

import roomStyles from './data/room_styles';
import weapons from './data/weapons';

library.add(fab, faGamepad, faFan, faServer, faBomb, faRocket, faIndustry, faLemon, faChessKnight, faBed, faPrescriptionBottleAlt, faMicroscope, faIcicles, faDumpsterFire, faBoxes);

export default function Module(props) {
  const [inHover, setHover] = useState(false);
  
  let descStr = null;
  if (props.item.title === 'Weapon') {
    descStr = props.item.description + ' (' + utils.rollOn(weapons).title + ').';
  } else {
    descStr = props.item.description;
  }

  return (
    <div className='module'>
      <div 
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onMouseDown={() => setHover(false)}
        onMouseUp={() => setHover(true)}
        style={{ 'height': '100%', 'width': '100%' }}
      >
        <FontAwesomeIcon className='module-icon' icon={roomStyles[props.item.title]} size='lg' />
        <span>{props.number}</span>
      </div>
      {inHover && <ModuleDescription title={props.item.title} description={descStr} equipment={props.item.equipment} survivors={props.item.survivors} />}
    </div>
  );
}