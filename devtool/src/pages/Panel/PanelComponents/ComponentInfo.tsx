import React from 'react';
import { useSelector } from 'react-redux';
import {
  Component,
  selectHighlightedComponent,
} from '../slices/highlightedComponentSlice';

const ComponentInfo = () => {
  const highlightedComponent: Component = useSelector(
    selectHighlightedComponent
  );
    console.log('highlightedComponent', highlightedComponent)
  return (
    <div className="pane">
      <h2>{highlightedComponent.tagName}</h2>
      <h3>State</h3>
      {highlightedComponent.componentState &&
        //@ts-ignore
        Object.keys(highlightedComponent.componentState).map((key) => {
          return (
            <div style={{ display: 'flex' }}>
              <div>{key}:</div>
              {/*@ts-ignore*/}
              <div>{highlightedComponent.componentState[key]}</div>
            </div>
          );
        })}
      <h3>Props</h3>
      {highlightedComponent.componentProps &&
        //@ts-ignore
        Object.keys(highlightedComponent.componentProps).map((key) => {
          return (
            <div style={{ display: 'flex' }}>
            <div>{key}:</div>
            {/*@ts-ignore*/}
            <div>{highlightedComponent.componentProps[key]}</div>
            </div>
          );
        })}
    </div>
  );
};

export default ComponentInfo;
