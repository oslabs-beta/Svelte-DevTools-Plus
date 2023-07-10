import React from 'react';
import { useSelector } from 'react-redux';
import { selectSelectedComponent } from '../slices/selectedComponentSlice';

const ComponentInfo: any = () => {
  const selectedComponent = useSelector(selectSelectedComponent);

  return (
    <div className="pane">
      <h2>{selectedComponent.component}</h2>
      <h3>State</h3>
      {selectedComponent.componentState &&
        Object.keys(selectedComponent.componentState).map((i) => {
          return (
            <div style={{ display: 'flex' }}>
              <div>{i}:</div>
              <div>{selectedComponent.componentState[i]}</div>
            </div>
          );
        })}
      <h3>Props</h3>
      {selectedComponent.componentProps &&
        Object.keys(selectedComponent.componentProps).map((i) => {
          return (
            <div style={{ display: 'flex' }}>
              <div>{i}:</div>
              <div>{selectedComponent.componentProps[i]}</div>
            </div>
          );
        })}
    </div>
  );
};

export default ComponentInfo;
