// @ts-nocheck
import React, { useRef, useCallback, useState, useEffect } from 'react';
import Tree from 'react-d3-tree';
import '../Panel.css';
import { useDispatch } from 'react-redux';

/*
  Setting up custom tree
  Here we're using `renderCustomNodeElement` to bind event handlers
  to the DOM nodes of our choice.
  In this case, we only want the node to toggle if the *label* is clicked.
  Additionally we've replaced the circle's `onClick` with a custom event,
  which differentiates between branch and leaf nodes.
*/
const renderNodeWithCustomEvents = ({
  nodeDatum,
  toggleNode,
  handleNodeClick,
}) => (
  <g>
    <circle
      fill="rgb(91, 170, 204)"
      r="8"
      onClick={() => handleNodeClick(nodeDatum)}
    />
    <text
      alt="Component Name"
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

// The page for Tree visualization
const TreePage: React.FC<TreePageProps> = ({
  rootComponentData,
}: TreePageProps) => {
  const dispatch = useDispatch();
  const orgChart = convertToObject(rootComponentData);
  const elementRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const handleNodeClick = useCallback((rootComponentData) => {
    dispatch({
      type: 'highlightedComponent/setHighlightedComponent',
      payload: {
        tagName: rootComponentData.tagName,
        detail: rootComponentData.detail,
        id: rootComponentData.id,
      },
    });
  }, []);

  // Function responsible from parsing data and putting it into right format
  function convertToObject(input: any): CustomNodeDatum {
    if (!input) return;
    const { tagName, componentProps, componentState, children, detail, id } =
      input;
    const newObj: CustomNodeDatum = {
      name: tagName,
      tagName: tagName,
      detail: detail,
      id: id,
    };
    if (componentProps) newObj.attributes = componentProps;
    if (componentState) {
      newObj.attributes = { ...newObj.attributes, ...componentState };
    }
    if (children && children.length > 0) {
      newObj.children = children.map((child: any) => convertToObject(child));
    }
    return newObj;
  }

  useEffect(() => {
    if (elementRef.current) {
      const { offsetWidth, offsetHeight } = elementRef.current;
      setDimensions({ width: offsetWidth, height: offsetHeight });
    }
  }, []);

  return (
    <div ref={elementRef} className="pane-content" data-testid="tree-page">
      <div id="tree-content">
        <Tree
          id="tree"
          data={orgChart}
          nodeSize={{ x: 90, y: 30 }}
          translate={{ x: dimensions.width / 2, y: dimensions.height / 2 }}
          renderCustomNodeElement={(rd3tProps) =>
            renderNodeWithCustomEvents({ ...rd3tProps, handleNodeClick })
          }
          zoomable={true}
          orientation="horizontal"
        />
      </div>
    </div>
  );
};

export default TreePage;
