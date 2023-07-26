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
      <h2>{highlightedComponent.tagName}</h2>
      <h3>State</h3>
      {highlightedComponent.detail.ctx && (
        <ul>
          {/* state is any, because a component's state can be anything */}
          {highlightedComponent.detail.ctx.map((state: any) => (
            <li className="state-value" key={uuidv4()}>
              <p className="property-name">{state.key}:</p>
              <StateValue
                value={state.value}
                stateKey={state.key}
                componentId={highlightedComponent.id}
                isProp={false}
              />
            </li>
          ))}
        </ul>
      )}
      <h3>Props</h3>
      {highlightedComponent.detail.attributes && (
        <ul>
          {/* prop is any, because a component's props can be anything */}
          {highlightedComponent.detail.attributes.map((props: any) => (
            <li className="state-value" key={uuidv4()}>
              <p className="property-name">{props.key}:</p>
              <StateValue
                value={props.value}
                stateKey={props.key}
                componentId={highlightedComponent.id}
                isProp={true}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ComponentInfo;
