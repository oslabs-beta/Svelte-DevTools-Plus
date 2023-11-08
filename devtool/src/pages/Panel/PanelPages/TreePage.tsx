// @ts-nocheck
import React from 'react';
import { useCallback, useState, useEffect } from 'react';
import Tree from 'react-d3-tree';
import '../Panel.css';
import { useDispatch } from 'react-redux';

const containerStyles = {
  width: '100vw',
  height: '100vh',
};

// Setting up custom tree
const useCenteredTree = (defaultTranslate = { x: 0, y: 0 }) => {
  const [translate, setTranslate] = useState(defaultTranslate);
  const [dimensions, setDimensions] = useState();
  const containerRef = useCallback((containerElem: HTMLElement | null) => {
    if (containerElem === null) return;
    const { width, height } = containerElem.getBoundingClientRect();
    setDimensions({ width, height });
    setTranslate({ x: width / 2, y: height / 2 });
  }, []);
  return [dimensions, translate, containerRef];
};
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
    <circle
      fill="rgb(91, 170, 204)"
      r="15"
      onClick={() => handleNodeClick(nodeDatum)}
    />
    <text
      fill="white"
      stroke="none"
      strokeWidth="1"
      x="20"
      fontSize="15"
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
  const handleNodeClick = (rootComponentData) => {
    dispatch({
      type: 'highlightedComponent/setHighlightedComponent',
      payload: {
        tagName: rootComponentData.tagName,
        detail: rootComponentData.detail,
        id: rootComponentData.id,
      },
    });
  };
  const [translate, containerRef] = useCenteredTree();

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
    if (componentState)
      newObj.attributes = { ...newObj.attributes, ...componentState };

    if (children && children.length > 0) {
      newObj.children = children.map((child: any) => convertToObject(child));
    }

    return newObj;
  }

  const orgChart = convertToObject(rootComponentData);
  const treeRef = React.createRef(containerRef);
  return (
    <div data-testid="tree-page">
      <h2 className="component-header">Component Tree Structure</h2>
      <div className="pane-content" style={containerStyles} ref={treeRef}>
        <Tree
          data={orgChart}
          translate={translate}
          renderCustomNodeElement={(rd3tProps) =>
            renderNodeWithCustomEvents({ ...rd3tProps, handleNodeClick })
          }
          orientation="vertical"
        />
      </div>
    </div>
  );
};

export default TreePage;
