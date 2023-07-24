import React from 'react';
import { useSelector } from 'react-redux';
import {
  Component,
  selectHighlightedComponent,
} from '../slices/highlightedComponentSlice';
import './ComponentInfo.css';
import StateModifier from './StateModifier';
import { v4 as uuidv4 } from 'uuid';

const ComponentInfo = () => {
  const highlightedComponent: Component = useSelector(
    selectHighlightedComponent
  );

  return (
    <div className="pane" id="component-info">
      <h2>{highlightedComponent.tagName}</h2>
      <h3>State</h3>
      {highlightedComponent.componentState && (
        <ul>
          {Object.keys(highlightedComponent.componentState).map((key) => {
            return (
              <li className="property-item" key={uuidv4()}>
                <p className="property-name">{key}:</p>
                {typeof highlightedComponent.componentState[key] === 'number' ||
                typeof highlightedComponent.componentState[key] === 'string' ? (
                  <StateModifier
                    componentId={highlightedComponent.id}
                    stateKey={key}
                    initValue={highlightedComponent.componentState[key]}
                  />
                ) : (
                  <div className="constant-property">
                    {highlightedComponent.componentState[key]}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
      <h3>Props</h3>
      {highlightedComponent.detail.attributes && (
        <ul>
          {/* prop is any, because a component's props can be anything */}
          {highlightedComponent.detail.attributes.map((prop: any) => {
            return (
              <li className="property-item" key={uuidv4()}>
                <p className="property-name">{prop.key}:</p>
                {typeof prop.value !== 'object' && (
                  <div className="constant-property">{prop.value}</div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ComponentInfo;
