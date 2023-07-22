import React from "react";
import { useSelector } from "react-redux";
import {
  Component,
  selectHighlightedComponent,
} from "../slices/highlightedComponentSlice";
import "./ComponentInfo.css";
import StateModifier from "./StateModifier";

const ComponentInfo = () => {
  const highlightedComponent: Component = useSelector(
    selectHighlightedComponent
  );

  const selectedState = highlightedComponent.componentState;
  const selectedProps = highlightedComponent.componentProps;

  return (
    <div className="pane" id="component-info">
      <h2>{highlightedComponent.tagName}</h2>
      <h3>State</h3>
      {selectedState && (
        <ul>
          {Object.keys(selectedState).map((key) => {
            return (
              <li className="property-item">
                <p className="property-name">{key}:</p>
                {
                  typeof selectedState[key] === "number" ||
                  typeof selectedState[key] === "string" ? (
                    <StateModifier initValue={selectedState[key]} />
                  ) : (
                    <div className="constant-property">
                      {selectedState[key]}
                    </div>
                  )
                }
              </li>
            );
          })}
        </ul>
      )}
      <h3>Props</h3>
      {selectedProps && (
        <ul>
          {Object.keys(selectedProps).map((key) => {
            return (
              <li className="property-item">
                <p className="property-name">{key}:</p>
                <div className="constant-property">{selectedProps[key]}</div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ComponentInfo;
