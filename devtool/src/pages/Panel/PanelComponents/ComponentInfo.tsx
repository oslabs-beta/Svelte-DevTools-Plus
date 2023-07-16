import React from "react";
import { useSelector } from "react-redux";
import { selectHighlightedComponent } from "../slices/highlightedComponentSlice";

const ComponentInfo: any = () => {
  const highlightedComponent = useSelector(selectHighlightedComponent);

  return (
    <div className="pane">
      <h2>{highlightedComponent.component}</h2>
      <h3>State</h3>
      {highlightedComponent.componentState &&
        Object.keys(highlightedComponent.componentState).map((i) => {
          return (
            <div style={{ display: "flex" }}>
              <div>{i}:</div>
              <div>{highlightedComponent.componentState[i]}</div>
            </div>
          );
        })}
      <h3>Props</h3>
      {highlightedComponent.componentProps &&
        Object.keys(highlightedComponent.componentProps).map((i) => {
          return (
            <div style={{ display: "flex" }}>
              <div>{i}:</div>
              <div>{highlightedComponent.componentProps[i]}</div>
            </div>
          );
        })}
    </div>
  );
};

export default ComponentInfo;
