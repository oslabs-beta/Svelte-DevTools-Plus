// @ts-nocheck
import React from 'react';
import Tree from 'react-d3-tree';
import './custom-tree.css';

const orgChart = {};

// Here we're using `renderCustomNodeElement` to bind event handlers
// to the DOM nodes of our choice.
// In this case, we only want the node to toggle if the *label* is clicked.
// Additionally we've replaced the circle's `onClick` with a custom event,
// which differentiates between branch and leaf nodes.
const renderNodeWithCustomEvents = ({
  nodeDatum,
  toggleNode,
  handleNodeClick,
}) => (
  <g>
    <circle r="15" onClick={() => handleNodeClick(nodeDatum)} />
    <text fill="white" strokeWidth="1" x="20" onClick={toggleNode}>
      {nodeDatum.name} (click me to toggle 👋)
    </text>
    {nodeDatum.attributes?.department && (
      <text fill="white" x="20" dy="20" strokeWidth="1">
        Department: {nodeDatum.attributes?.department}
      </text>
    )}
  </g>
);

import { useCallback, useState } from 'react';

export const useCenteredTree = (defaultTranslate = { x: 0, y: 0 }) => {
  const [translate, setTranslate] = useState(defaultTranslate);
  const containerRef = useCallback((containerElem) => {
    if (containerElem !== null) {
      const { width, height } = containerElem.getBoundingClientRect();
      setTranslate({ x: width / 2, y: height / 2 });
    }
  }, []);
  return [translate, containerRef];
};

export default function ChartTree() {
  const [translate] = useCenteredTree();
  return (
    <div id="treeWrapper" style={{ width: '50em', height: '20em' }}>
      <Tree
        data={orgChart}
        rootNodeClassName="node__root"
        branchNodeClassName="node__branch"
        leafNodeClassName="node__leaf"
        translate={translate}
        renderCustomNodeElement={(rd3tProps) =>
          renderNodeWithCustomEvents({ ...rd3tProps })
        }
      />
    </div>
  );
}
