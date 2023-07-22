import React from "react";
import { useCallback, useState } from "react";
import { ComponentPageProps } from "../Panel";
import Tree from "react-d3-tree";
import "../Panel.css";

// Setting up custom tree
const useCenteredTree = (defaultTranslate = { x: 0, y: 0 }) => {
  const [translate, setTranslate] = useState(defaultTranslate);
  const [dimensions, setDimensions] = useState();
  const containerRef = useCallback((containerElem) => {
    if (containerElem !== null) {
      const { width, height } = containerElem.getBoundingClientRect();
      setDimensions({ width, height });
      setTranslate({ x: width / 2, y: height / 2 });
    }
  }, []);
  return [dimensions, translate, containerRef];
};

// Here we're using `renderCustomNodeElement` to represent each node
// as an SVG `rect` instead of the default `circle`.
const renderRectSvgNode = ({ nodeDatum, toggleNode }) => (
  <g>
    <rect
      fill="rgb(91, 170, 204)"
      width="20"
      height="20"
      x="-10"
      onClick={toggleNode}
    />
    <text fill="white" stroke="none" strokeWidth="1" x="20">
      {nodeDatum.name}
    </text>
    {nodeDatum.attributes?.department && (
      <text fill="white" stroke="none" x="20" dy="20" strokeWidth="1">
        Department: {nodeDatum.attributes?.department}
      </text>
    )}
  </g>
);

const TreePage: React.FC<ComponentPageProps> = ({
  rootComponentData,
}: ComponentPageProps) => {
  const [dimensions, translate, containerRef] = useCenteredTree();

  // Function responsible from parsing data and putting it into right format
  function convertToObject(input) {
    const { component, componentProps, componentState, children } = input;
    const newObj = { name: component };

    if (componentProps) newObj.attributes = componentProps;
    if (componentState)
      newObj.attributes = { ...newObj.attributes, ...componentState };

    if (children && children.length > 0) {
      newObj.children = children.map((child) => convertToObject(child));
    }

    return newObj;
  }

  const orgChart = convertToObject(rootComponentData);

  return (
    <div className="pane">
      <>
        <h1>Component Tree Page</h1>
        {rootComponentData && <div>Tree gets rendered here</div>}
        <div id="treeWrapper">
          <Tree
            data={orgChart}
            dimensions={dimensions}
            translate={translate}
            renderCustomNodeElement={renderRectSvgNode}
            orientation="vertical"
            pathClassFunc={() => "custom-link"}
          />
        </div>
      </>
    </div>
  );
};

export default TreePage;
