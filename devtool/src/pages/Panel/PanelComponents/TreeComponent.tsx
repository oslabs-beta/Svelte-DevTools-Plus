import React from "react";
import "./TreeComponent.css";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";

interface TreeComponentProps {
  component: string;
  componentState: Object | null;
  componentProps: Object | null;
  children: Array<TreeComponentProps> | null;
  level: number;
}

const TreeComponent: React.FC<TreeComponentProps> = ({
  component,
  componentState,
  componentProps,
  children,
  level,
}: TreeComponentProps) => {
  const childrenState: Array<JSX.Element> = [];
  if (children) {
    children.forEach((i) => {
      childrenState.push(
        <TreeComponent
          component={i.component}
          componentState={i.componentState}
          componentProps={i.componentProps}
          children={i.children}
          level={level + 1}
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
        component: component,
        componentState: componentState,
        componentProps: componentProps,
      },
    });
  }

  let componentString = "<" + component + "/>";
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
