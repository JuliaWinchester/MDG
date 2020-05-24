import React, { useState } from 'react';

import ModuleDescription from './ModuleDescription';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faGamepad, faFan, faServer, faBomb, faRocket, faIndustry, faLemon, faChessKnight, faBed, faPrescriptionBottleAlt, faMicroscope, faIcicles, faDumpsterFire, faBoxes } from '@fortawesome/free-solid-svg-icons';

import './App.css';

import roomStyles from './data/room_styles';

library.add(fab, faGamepad, faFan, faServer, faBomb, faRocket, faIndustry, faLemon, faChessKnight, faBed, faPrescriptionBottleAlt, faMicroscope, faIcicles, faDumpsterFire, faBoxes);

export default function Module(props) {
  const [inHover, setHover] = useState(false);
  
  return (
    <div className='module'>
      <div 
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onMouseDown={() => setHover(false)}
        onMouseUp={() => setHover(true)}
        style={{ 'height': '100%', 'width': '100%' }}
      >
        <FontAwesomeIcon className='module-icon' icon={roomStyles[props.item.content.title]} size='lg' />
      </div>
      {inHover && <ModuleDescription title={props.item.content.title} description={props.item.content.description} />}
    </div>
  );
}