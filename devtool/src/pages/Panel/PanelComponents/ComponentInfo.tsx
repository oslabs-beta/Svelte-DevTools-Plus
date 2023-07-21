import React from "react";
import { useSelector } from "react-redux";
import {
  Component,
  selectHighlightedComponent,
} from "../slices/highlightedComponentSlice";

const ComponentInfo = () => {
  const highlightedComponent: Component = useSelector(
    selectHighlightedComponent
  );

  return (
    <div className="pane">
      <h2>{highlightedComponent.tagName}</h2>
      <h3>State</h3>
      {highlightedComponent.componentState &&
        highlightedComponent.componentState.map((i) => {
          return (
            <div style={{ display: "flex" }}>
              <div>{i.key}:</div>
              <div>{i.value}</div>
            </div>
          );
        })}
      <h3>Props</h3>
      {highlightedComponent.componentProps &&
        highlightedComponent.componentProps.map((i) => {
          return (
            <div style={{ display: "flex" }}>
              <div>{i.key}:</div>
              <div>{i.value}</div>
            </div>
          );
        })}
    </div>
  );
};

export default ComponentInfo;
