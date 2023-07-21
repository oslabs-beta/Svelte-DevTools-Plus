import React from "react";
import "./TreeComponent.css";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";

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

  const dispatch = useDispatch();

  function handleClick() {
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
    <div className="tree-component">
      {childrenState.length > 0 ? (
        <details style={{ paddingLeft: `2rem` }}>
          <summary onClick={handleClick}>{componentString}</summary>
          <div>{childrenState.map((item, index) => item)}</div>
        </details>
      ) : (
        <div style={{ paddingLeft: "2rem" }}>{componentString}</div>
      )}
    </div>
  );
};

export default TreeComponent;
