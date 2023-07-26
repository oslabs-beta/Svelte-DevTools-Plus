import React from 'react';
import { useCallback, useState, useEffect } from 'react';
import { ComponentPageProps } from '../Panel';
import Tree from 'react-d3-tree';
import '../Panel.css';
import { json } from 'react-router-dom';
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
    if (containerElem !== null) {
      const { width, height } = containerElem.getBoundingClientRect();
      setDimensions({ width, height });
      setTranslate({ x: width / 2, y: height / 2 });
    }
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

const TreePage: React.FC<TreePageProps> = ({
  rootComponentData,
}: TreePageProps) => {

  const dispatch = useDispatch();
  const handleNodeClick = (rootComponentData) => {
    const obj = {
      tagName: rootComponentData.tagName,
      detail: rootComponentData.detail,
      id: rootComponentData.id,
    };
    console.log(obj);
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

  return (
    <div style={containerStyles} ref={containerRef}>
      <h2 className="component-header">Component Tree Structure</h2>
      <Tree
        data={orgChart}
        translate={translate}
        renderCustomNodeElement={(rd3tProps) =>
          renderNodeWithCustomEvents({ ...rd3tProps, handleNodeClick })
        }
        orientation="vertical"
      />
    </div>
  ); 
};

export default TreePage;

// // Setting up custom tree
// const useCenteredTree = (defaultTranslate = { x: 0, y: 0 }) => {
//   const [translate, setTranslate] = useState(defaultTranslate);
//   const [dimensions, setDimensions] = useState();
//   const containerRef = useCallback((containerElem: HTMLElement | null) => {
//     if (containerElem !== null) {
//       const { width, height } = containerElem.getBoundingClientRect();
//       setDimensions({ width, height });
//       setTranslate({ x: width / 2, y: height / 2 });
//     }
//   }, []);
//   return [dimensions, translate, containerRef];
// };

// // Here we're using `renderCustomNodeElement` to represent each node
// // as an SVG `rect` instead of the default `circle`.
// const renderRectSvgNode = ({
//   nodeDatum,
//   toggleNode,
// }: TreeNodeProps<CustomNodeDatum>) => (
//   <g>
//     <rect
//       fill="rgb(91, 170, 204)"
//       width="20"
//       height="20"
//       x="-10"
//       onClick={toggleNode}
//     />
//     <text fill="white" stroke="none" strokeWidth="1" x="20">
//       {nodeDatum.name}
//     </text>
//     {nodeDatum.attributes?.department && (
//       <text fill="white" stroke="none" x="20" dy="20" strokeWidth="1">
//         Department: {nodeDatum.attributes?.department}
//       </text>
//     )}
//   </g>
// );

// interface TreePageProps {
//   rootComponentData: CustomNodeDatum;
// }

// const TreePage: React.FC<TreePageProps> = ({
//   rootComponentData,
// }: TreePageProps) => {
//   const [dimensions, translate, containerRef] = useCenteredTree();

// // Function responsible from parsing data and putting it into right format
// function convertToObject(input: any): CustomNodeDatum {
//   const { tagName, componentProps, componentState, children } = input;
//   const newObj: CustomNodeDatum = { name: tagName };

//   if (componentProps) newObj.attributes = componentProps;
//   if (componentState)
//     newObj.attributes = { ...newObj.attributes, ...componentState };

//   if (children && children.length > 0) {
//     newObj.children = children.map((child: any) => convertToObject(child));
//   }

//   return newObj;
// }

// const orgChart = convertToObject(rootComponentData);

//   return (
//     <div className="pane">
//       <>
//         <h1>Component Tree Page</h1>
//         {rootComponentData && <div>Tree gets rendered here</div>}
//         <div id="treeWrapper">
//           <Tree
//             data={orgChart}
//             dimensions={dimensions}
//             translate={translate}
//             renderCustomNodeElement={renderRectSvgNode}
//             orientation="vertical"
//             pathClassFunc={() => 'custom-link'}
//           />
//         </div>
//       </>
//     </div>
//   );
// };
