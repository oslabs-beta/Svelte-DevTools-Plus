import React, { useEffect, useRef, useState } from 'react';
import './TreeComponent.css';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import Collapsible from 'react-collapsible';
import { Component } from '../slices/highlightedComponentSlice';

interface TreeComponentProps {
  componentData: Component;
}

const openMap = new Map();

const TreeComponent: React.FC<TreeComponentProps> = ({
  componentData,
}: TreeComponentProps) => {
  const childrenState: Array<JSX.Element> = [];
  if (componentData.children) {
    componentData.children.forEach((child: Component) => {
      childrenState.push(
        <TreeComponent componentData={child} key={uuidv4()} />
      );
    });
  }

  const dispatch = useDispatch();

  function handleClick() {
    const open = openMap.get(componentData.id);
    openMap.set(componentData.id, open ? false : true);

    dispatch({
      type: 'highlightedComponent/setHighlightedComponent',
      payload: {
        tagName: componentData.tagName,
        detail: componentData.detail,
        id: componentData.id,
      },
    });
  }

  let componentString = '<' + componentData.tagName + '/>';
  return (
    <div tabIndex={0}>
      {childrenState.length > 0 ? (
        <Collapsible
          tabIndex={0}
          onOpen={handleClick}
          onClose={handleClick}
          transitionTime={50}
          trigger={componentString}
          open={openMap.get(componentData.id)}
          overflowWhenOpen="visible"
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

// KNOWN ISSUE: onOpen and onClick won't call handleClick on the
// app component after an update it might be a bug with Collapsible
// maybe try a different library, or vanilla HTML. At least I can
// keep my windows open now

export default TreeComponent;
