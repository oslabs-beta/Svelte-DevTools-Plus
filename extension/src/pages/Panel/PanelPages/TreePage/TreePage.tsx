import React, { useRef, useCallback, useState, useEffect } from 'react';
import Tree, { CustomNodeElementProps } from 'react-d3-tree';
import './TreePage.css';
import { useDispatch } from 'react-redux';
import { Component } from '../../slices/highlightedComponentSlice';

interface TreePageProps {
  rootComponentData: Component; // Define the type based on your actual data structure
}

interface NodeData {
  name: string;
  tagName?: string;
  detail?: string;
  id: number;
  attributes: any;
  children: NodeData[];
}

const emptyNode : NodeData = {
  name: "Error",
  tagName: "Error",
  detail: "Error",
  id: 0,
  attributes: {},
  children: []
}
/*
  Setting up custom tree
  Here we're using `renderCustomNodeElement` to bind event handlers
  to the DOM nodes of our choice.
  In this case, we only want the node to toggle if the *label* is clicked.
  Additionally we've replaced the circle's `onClick` with a custom event,
  which differentiates between branch and leaf nodes.
*/
const renderNodeWithCustomEvents = (
  nodeDatum: any,
  toggleNode: any,
  handleNodeClick: any,
) => (
  <g>
    <circle
      fill="rgb(91, 170, 204)"
      r="8"
      onClick={() => handleNodeClick(nodeDatum)}
    />
    <text
      aria-label="Component Name"
      fill="white"
      stroke="none"
      strokeWidth="1"
      x="13"
      y="-8"
      fontSize="12"
      onClick={toggleNode}
    >
      {nodeDatum.name}
    </text>
    {nodeDatum.attributes?.department && (
      <text fill="black" x="20" dy="20" strokeWidth="1">
        (collapse)
      </text>
    )}
  </g>
);

// Function responsible from parsing data and putting it into right format
// Returns an empty object if the input can not be converted
function convertToObject(input: Component): NodeData {
  if (!input) {
    return emptyNode;
  };
  const { tagName, children, detail, id } = input;
  if (!tagName || !children || !detail || !id) return emptyNode;
  const newObj : NodeData = {
    name: tagName,
    tagName: tagName,
    detail: detail,
    id: id,
    attributes: {},
    children: []
  };
  if (children && children.length > 0) {
    newObj.children = children.map((child): NodeData => convertToObject(child));
  }
  return newObj;
}

// The page for Tree visualization
const TreePage: React.FC<TreePageProps> = ({
  rootComponentData,
}: TreePageProps) => {
  const dispatch = useDispatch();
  const elementRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [orgChart, setOrgChart] = useState(emptyNode);
  const [errorMessage, setErrorMessage] = useState("");

  const handleNodeClick = useCallback((rootComponentData: Component) => {
    dispatch({
      type: 'highlightedComponent/setHighlightedComponent',
      payload: {
        tagName: rootComponentData.tagName,
        detail: rootComponentData.detail,
        id: rootComponentData.id,
      },
    });
  }, [dispatch]);

  useEffect(() => {
    if (elementRef.current) {
      const { offsetWidth, offsetHeight } = elementRef.current;
      setDimensions({ width: offsetWidth, height: offsetHeight });
    }
    const data = convertToObject(rootComponentData);
    if (data === emptyNode) {
      setErrorMessage("Unable to get node data")
    }
    setOrgChart(data);
  }, [rootComponentData]);

  return (
    <div ref={elementRef} className="pane-content" data-testid="tree-page">
      {errorMessage ? (
        <div id="tree-error-message">{errorMessage}</div>
      ) : (
        <div id="tree-content">
          <Tree
            // id="tree"
            data={orgChart}
            nodeSize={{ x: 90, y: 30 }}
            translate={{ x: dimensions.width / 2, y: dimensions.height / 2 }}
            renderCustomNodeElement={(rd3tNodeProps: CustomNodeElementProps) =>
              renderNodeWithCustomEvents(rd3tNodeProps.nodeDatum, rd3tNodeProps.toggleNode, handleNodeClick)
            }
            zoomable={true}
            orientation="horizontal"
          />
        </div>
      )}
    </div>
  );
};

export default TreePage;
