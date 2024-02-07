import React, { useRef, useCallback, useState, useEffect } from 'react';
import Tree, { CustomNodeElementProps, TreeNodeDatum } from 'react-d3-tree';
import './TreePage.css';
import { useDispatch } from 'react-redux';
import { Component } from '../../slices/highlightedComponentSlice';

interface TreePageProps {
  rootComponentData: Component; // Define the type based on your actual data structure
}

const emptyNode: TreeNodeDatum = {
  __rd3t: {
    id: '0',
    depth: 0,
    collapsed: true,
  },
  name: 'Error',
  attributes: {},
  children: [],
};

/*
  Setting up custom tree
  Here we're using `renderCustomNodeElement` to bind event handlers
  to the DOM nodes of our choice.
  In this case, we only want the node to toggle if the *label* is clicked.
  Additionally we've replaced the circle's `onClick` with a custom event,
  which differentiates between branch and leaf nodes.
*/

function createNodeText(name: string, onClick?: () => void): JSX.Element {
  let className = 'node-text';
  if (!onClick) {
    className += ' leaf-node';
  }
  const nodeText = (
    <text
      className={className}
      aria-label="Component Name"
      x="13"
      y="-8"
      onClick={onClick}
    >
      {name}
    </text>
  );
  return nodeText;
}

const renderNodeWithCustomEvents = (
  nodeDatum: TreeNodeDatum,
  toggleNode: () => void,
  handleNodeClick: (rootComponentData: TreeNodeDatum) => void
) => {
  return (
    <g>
      <circle
        className="tree-node-circle"
        fill="rgb(91, 170, 204)"
        r="8"
        onClick={() => handleNodeClick(nodeDatum)}
      />
      {nodeDatum.children && nodeDatum.children.length !== 0
        ? createNodeText(nodeDatum.name, toggleNode)
        : createNodeText(nodeDatum.name)}
      {nodeDatum.attributes?.department && (
        <text fill="black" x="20" dy="20" strokeWidth="1">
          (collapse)
        </text>
      )}
    </g>
  );
};

// Function responsible from parsing data and putting it into right format
// Returns an empty object if the input can not be converted
function convertToObject(input: Component, depth = 0): TreeNodeDatum {
  if (input === undefined || input == null) {
    return emptyNode;
  }
  console.log('input', input);
  const { tagName, children, detail, id } = input;
  if (
    tagName === undefined ||
    children === undefined ||
    detail === undefined ||
    id === undefined
  ) {
    return emptyNode;
  }
  const newObj: TreeNodeDatum = {
    __rd3t: {
      id: '0',
      depth: depth,
      collapsed: false,
    },
    name: tagName,
    attributes: detail,
    children: [],
  };
  if (children && children.length > 0) {
    newObj.children = children.map(
      (child): TreeNodeDatum => convertToObject(child, depth + 1)
    );
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
  const [errorMessage, setErrorMessage] = useState('');

  const handleNodeClick = useCallback(
    (rootComponentData: TreeNodeDatum) => {
      dispatch({
        type: 'highlightedComponent/setHighlightedComponent',
        payload: {
          tagName: rootComponentData.name,
          detail: rootComponentData.attributes,
          id: rootComponentData.__rd3t.id,
        },
      });
    },
    [dispatch]
  );

  useEffect(() => {
    if (elementRef.current) {
      const { offsetWidth, offsetHeight } = elementRef.current;
      setDimensions({ width: offsetWidth, height: offsetHeight });
    }
    const data = convertToObject(rootComponentData);
    if (data === emptyNode) {
      setErrorMessage('Unable to get node data');
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
            data={orgChart}
            nodeSize={{ x: 90, y: 30 }}
            translate={{ x: dimensions.width / 2, y: dimensions.height / 2 }}
            renderCustomNodeElement={(rd3tNodeProps: CustomNodeElementProps) =>
              renderNodeWithCustomEvents(
                rd3tNodeProps.nodeDatum,
                rd3tNodeProps.toggleNode,
                handleNodeClick
              )
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
