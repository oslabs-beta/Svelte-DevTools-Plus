import React from 'react';
import { useSelector } from 'react-redux';
import {
  Component,
  selectHighlightedComponent,
} from '../../../../../Store/slices/highlightedComponentSlice';
import './ComponentInfo.css';
import { StateValue } from '../StateValue/StateValue';

// ComponentInfo displays all information about the selected component
// and allows you to modify its state and props
const ComponentInfo = () => {
  const highlightedComponent: Component = useSelector(
    selectHighlightedComponent
  );

  return (
    <div className="pane">
      <header>
        <h2>{highlightedComponent.tagName}</h2>
      </header>
      <div className="pane-content">
        <h3>State</h3>
        {highlightedComponent.detail.ctx && (
          <ul className="component-info-ul">
            {/* state is any, because a component's state can be anything */}
            {highlightedComponent.detail.ctx.map(
              (state: any, index: number) => (
                <li
                  className="state-value"
                  key={`id-${highlightedComponent.id}-state-${index}`}
                >
                  <p className="property-name">{state.key}:</p>
                  <StateValue
                    value={state.value}
                    stateKey={state.key}
                    componentId={highlightedComponent.id}
                    isArray={Array.isArray(state)}
                  />
                </li>
              )
            )}
          </ul>
        )}
        <h3>Props</h3>
        {highlightedComponent.detail.attributes && (
          <ul className="component-info-ul">
            {/* prop is any, because a component's props can be anything */}
            {highlightedComponent.detail.attributes.map(
              (prop: any, index: number) => (
                <li
                  className="state-value"
                  key={`id-${highlightedComponent.id}-props-${index}`}
                >
                  <p className="property-name">{prop.key}:</p>
                  <StateValue
                    value={prop.value}
                    stateKey={prop.key}
                    componentId={highlightedComponent.id}
                    isArray={Array.isArray(prop)}
                  />
                </li>
              )
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ComponentInfo;
