import React from 'react';
import _ from "lodash";

import './App.css';

export default function ModuleDescription(props) {
  let equipmentDescription = _.map(props.equipment, function(e, i) { 
    return <p className='module-text' key={e.title}>{e.title} ({e.units})</p>;
  });

  let survivorsDescription = _.map(props.survivors, function(s, i) { 
    return <p className='module-text' key={s.title}>{s.title} ({s.units})</p>;
  });

  return (
    <div className='moduleDescription'>
      <p className='module-header'><b>{props.title}</b></p>
      <p className='module-text'>{props.description}</p>
      { equipmentDescription }
      { survivorsDescription }
    </div>
  );
}