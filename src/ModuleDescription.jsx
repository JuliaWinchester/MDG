import React from 'react';

import './App.css';

export default function ModuleDescription(props) {
  return (
    <div className='moduleDescription'>
      <p className='module-header'><b>{props.title}</b></p>
      <p className='module-text'>{props.description}</p>
    </div>
  );
}