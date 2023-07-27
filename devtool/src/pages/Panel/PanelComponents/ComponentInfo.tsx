import React from 'react';
import { useSelector } from 'react-redux';
import {
  Component,
  selectHighlightedComponent,
} from '../slices/highlightedComponentSlice';
import './ComponentInfo.css';
import { v4 as uuidv4 } from 'uuid';
import { StateValue } from './StateValue';

const ComponentInfo = () => {
  const highlightedComponent: Component = useSelector(
    selectHighlightedComponent
  );

  return (
    <div className="pane" id="component-info">
      <header>
        <h2>{highlightedComponent.tagName}</h2>
      </header>
      <h3>State</h3>
      {highlightedComponent.detail.ctx && (
        <ul className="component-info-ul">
          {/* state is any, because a component's state can be anything */}
          {highlightedComponent.detail.ctx.map((state: any) => (
            <li className="state-value" key={uuidv4()}>
              <p className="property-name">{state.key}:</p>
              <StateValue
                value={state.value}
                stateKey={state.key}
                componentId={highlightedComponent.id}
                isArray={Array.isArray(state)}
              />
            </li>
          ))}
        </ul>
      )}
      <h3>Props</h3>
      {highlightedComponent.detail.attributes && (
        <ul className="component-info-ul">
          {/* prop is any, because a component's props can be anything */}
          {highlightedComponent.detail.attributes.map((prop: any) => (
            <li className="state-value" key={uuidv4()}>
              <p className="property-name">{prop.key}:</p>
              <StateValue
                value={prop.value}
                stateKey={prop.key}
                componentId={highlightedComponent.id}
                isArray={Array.isArray(prop)}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ComponentInfo;
