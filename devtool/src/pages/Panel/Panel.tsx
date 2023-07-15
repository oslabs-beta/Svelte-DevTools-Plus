import React, { useEffect, useState } from 'react';
import './Panel.css';
import SplitPane from 'react-split-pane';
import ComponentInfo from './PanelComponents/ComponentInfo';
import Navbar from './PanelComponents/Navbar';
import { Routes, Route, redirect } from 'react-router-dom';
import TreePage from './PanelPages/TreePage';
import StepPage from './PanelPages/StepPage';
const breakPoint = 50;

function Panel() {

  return (
    <div className='container'>
      <div id='content'>
        {/* @ts-ignore */}
        <SplitPane
          split='vertical'
          minSize={breakPoint}
          maxSize={-breakPoint}
          defaultSize={parseInt(String(localStorage.getItem('splitPos')), 10)}
          onChange={(size) => localStorage.setItem('splitPos', String(size))}
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
        </SplitPane>
      </div>
    </div>
  );
}

export default Panel;
