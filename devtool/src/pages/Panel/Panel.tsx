import React, { useEffect, useState } from 'react';
import './Panel.css';
import Split from 'react-split';
import TreeComponent from './PanelComponents/TreeComponent';
import ComponentInfo from './PanelComponents/ComponentInfo';
import Navbar from './PanelComponents/Navbar';
import { Routes, Route, redirect } from 'react-router-dom';
import TreePage from './PanelPages/TreePage';
import StepPage from './PanelPages/StepPage';

function Panel() {

  return (
    <div className='container'>
      <div id='content'>
        {/* @ts-ignore */}
        <Split className='split'
        >
          <div className='pane'>
            <Navbar />
            <Routes>
              <Route path='/' element={<StepPage />} />
              <Route path='/tree' element={<TreePage />} />
            </Routes>
          </div>
          <div>
            <ComponentInfo />
          </div>
        </Split>
      </div>
    </div>
  );
}

export default Panel;
