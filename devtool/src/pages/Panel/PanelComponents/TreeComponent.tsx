import React, { useRef, useState } from 'react';
import './TreeComponent.css';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import Collapsible from 'react-collapsible';
import { Component } from '../slices/highlightedComponentSlice';

interface TreeComponentProps {
  componentData: Component
}

const TreeComponent: React.FC<TreeComponentProps> = ({
  componentData
}: TreeComponentProps ) => {
  const childrenState: Array<JSX.Element> = [];
  if (componentData.children) {
    componentData.children.forEach((child: Component) => {
      childrenState.push(
        <TreeComponent
          componentData={child}
          key={uuidv4()}
        />
      );
    });
  }

  const open = useRef(true);
  console.log('open.current', open.current);
  const dispatch = useDispatch();

  function handleClick() {
    // open.current = open.current ? false : true
    console.log('dispatching');
    // console.log('e', e)
    // e.target.style.backgroundColor = 'yellow';
    dispatch({
      type: 'highlightedComponent/setHighlightedComponent',
      payload: {
        tagName: componentData.tagName,
        componentState: componentData.componentState,
        detail: componentData.detail,
        id: componentData.id
      },
    });
  }

  let componentString = '<' + componentData.tagName + '/>';
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
