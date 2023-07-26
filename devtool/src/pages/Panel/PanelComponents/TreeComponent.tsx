import React, { useEffect, useRef, useState } from 'react';
import './TreeComponent.css';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import Collapsible from 'react-collapsible';
import {
  Component,
  selectHighlightedComponent,
} from '../slices/highlightedComponentSlice';
import { useSelector } from 'react-redux';

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

  const highlightedComponent: Component = useSelector(
    selectHighlightedComponent
  );

  useEffect(() => {
    if (highlightedComponent.id === componentData.id) {
      console.log('updating highlighted component in TreeComponent.tsx');
      console.log('componentData: ', componentData);
      dispatch({
        type: 'highlightedComponent/updateHighlightedComponent',
        payload: componentData,
      });
      // Change the style so this tab is selected
    }
  }, []);

  function handleClick() {
    const open = openMap.get(componentData.id);
    openMap.set(componentData.id, open ? false : true);

    console.log('normal copy: ', componentData.detail)
    console.log('deep copy: ', {...componentData.detail})

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
