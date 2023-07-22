import React, { useRef, useState } from "react";
import "./TreeComponent.css";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import Collapsible from "react-collapsible";

interface TreeComponentProps {
  tagName: string;
  componentState: Object | null;
  componentProps: Object | null;
  children: Array<TreeComponentProps> | null;
}

const TreeComponent: React.FC<TreeComponentProps> = ({
  tagName,
  componentState,
  componentProps,
  children,
}: TreeComponentProps) => {
  const childrenState: Array<JSX.Element> = [];
  if (children) {
    children.forEach((i) => {
      childrenState.push(
        <TreeComponent
          tagName={i.tagName}
          componentState={i.componentState}
          componentProps={i.componentProps}
          children={i.children}
          key={uuidv4()}
        />
      );
    });
  }

  const open = useRef(true);
  console.log("open.current", open.current);
  const dispatch = useDispatch();

  function handleClick() {
    // open.current = open.current ? false : true

    // console.log('e', e)
    // e.target.style.backgroundColor = 'yellow';
    dispatch({
      type: "highlightedComponent/setHighlightedComponent",
      payload: {
        tagName: tagName,
        componentState: componentState,
        componentProps: componentProps,
      },
    });
  }

  let componentString = "<" + tagName + "/>";
  return (
    <div tabIndex={0} className="tree-component">
      {childrenState.length > 0 ? (
        <Collapsible
          tabIndex={0}
          onOpen={handleClick}
          onClose={handleClick}
          transitionTime={50}
          trigger={componentString}
        >
          {/* <summary onClick={handleClick}>{componentString}</summary> */}
          <div className="tree-component-content">
            {childrenState.map((item, index) => item)}
          </div>
        </Collapsible>
      ) : (
        <div tabIndex={0} className="tree-component" onClick={handleClick}>
          {componentString}
        </div>
      )}
    </div>
  );
};

export default TreeComponent;
