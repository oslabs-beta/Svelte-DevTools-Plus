import React from 'react';
import './Panel.css';
import SplitPane from 'react-split-pane';

const breakPoint = 50;

function Panel() {
  const spProps = {
    split: 'vertical',
  };
  return (
    <div className="container">
      <div id="content">
        {/* @ts-ignore */}
        <SplitPane
          split="vertical"
          minSize={breakPoint}
          maxSize={-breakPoint}
          defaultSize={parseInt(String(localStorage.getItem('splitPos')), 10)}
          onChange={(size) => localStorage.setItem('splitPos', String(size))}
        >
          <div className='pane'>
            <h1>Components</h1>
          </div>
          <div className='pane'>
            <h2>State</h2>
            <h2>Props</h2>
          </div>
        </SplitPane>
      </div>
    </div>
  );
}

export default Panel;
