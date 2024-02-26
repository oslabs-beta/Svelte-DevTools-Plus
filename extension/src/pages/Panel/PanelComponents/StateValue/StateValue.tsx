import StateModifier from '../StateModifier/StateModifier';
import './StateValue.css';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

interface StateValueProps {
  value: any;
  stateKey: string;
  componentId: number;
  isArray: boolean;
}

/*
  Each item under State and Props on the right side of the app is a StateValue
  This component displays information about the item, and allows you to
  modify it if the data type is modifiable
*/
export const StateValue = ({
  value,
  stateKey,
  componentId,
  isArray,
}: StateValueProps) => {
  return (
    <div
      key={value}
      className="property-item"
      data-testid={`state-value-${stateKey}`}
    >
      {Array.isArray(value) ? (
        <details className="state-value-array">
          <summary className="state-value-summary">{`Array [${value.length}]`}</summary>
          <ul>
            {/* Render an un-modifiable StateValue component if this data type
            can not be modified */}
            {value.map((i: any, index: number) => {
              return (
                <li
                  className="component-info-array-list-item"
                  key={`id-${componentId}-value-${index}`}
                >
                  <StateValue
                    stateKey={stateKey}
                    value={i}
                    componentId={componentId}
                    isArray={true}
                  />
                </li>
              );
            })}
          </ul>
        </details>
      ) : value === null ? (
        'null'
      ) : value === false ? (
        'false'
      ) : value === true ? (
        'true'
      ) : typeof value === 'number' || typeof value === 'string' ? (
        // Render a StateModifier component if this data type can be modified
        !isArray ? (
          <StateModifier
            componentId={componentId}
            stateKey={stateKey}
            initValue={value}
          />
        ) : (
          <div>{value}</div>
        )
      ) : typeof value === 'object' ? (
        value.hasOwnProperty('__isFunction') && value.__isFunction === true ? (
          <details>
            <summary className="constant-property state-value-summary">
              function() 
            </summary>
              <SyntaxHighlighter language="javascript" style={docco}>
            {value.source}
              </SyntaxHighlighter>
          </details>
        ) : null
      ) : null}
    </div>
  );
};
