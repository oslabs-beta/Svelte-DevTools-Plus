import React, { useEffect, useRef, useState } from 'react';
import './TreeComponent.css';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import {
  Component,
  selectHighlightedComponent,
} from '../slices/highlightedComponentSlice';
import { useSelector } from 'react-redux';
import { Collapse } from '@mui/material';
import disclosure from '../disclosure.png';
import disclosureOpen from '../disclosure-open.png';

interface TreeComponentProps {
  componentData: Component;
  level: number;
}

const openMap = new Map();
/*
  A TreeComponent is each component in the step visualization page.
  It shows up as simple text, and has an array of TreeComponents as children.
  Clicking on the TreeComponent toggles visibility of its children.
*/
const TreeComponent: React.FC<TreeComponentProps> = ({
  componentData,
  level,
}: TreeComponentProps) => {
  const childrenState: Array<JSX.Element> = [];
  if (componentData.children) {
    componentData.children.forEach((child: Component) => {
      childrenState.push(
        <TreeComponent componentData={child} level={1} key={uuidv4()} />
      );
    });
  }

  const selected = useRef(false);
  const dispatch = useDispatch();

  const highlightedComponent: Component = useSelector(
    selectHighlightedComponent
  );

  useEffect(() => {
    if (highlightedComponent.id === componentData.id) {
      dispatch({
        type: 'highlightedComponent/updateHighlightedComponent',
        payload: componentData,
      });
    }
  }, []);

  function handleExpand() {
    const open = openMap.get(componentData.id);
    openMap.set(componentData.id, open ? false : true);
    setOpen(open ? false : true);
  }

  function handleHighlight() {
    dispatch({
      type: 'highlightedComponent/setHighlightedComponent',
      payload: {
        tagName: componentData.tagName,
        detail: componentData.detail,
        id: componentData.id,
      },
    });
  }

  const [open, setOpen] = useState(openMap.get(componentData.id) || false);

  return (
    <div tabIndex={0}>
      {childrenState.length > 0 ? (
        <div>
          <div className="tree-component">
            {open ? (
              <div
                onClick={handleExpand}
                data-testid={`collapse-button-${componentData.tagName}`}
              >
                <img src={disclosureOpen} className="expand-button"></img>
              </div>
            ) : (
              <div
                onClick={handleExpand}
                data-testid={`expand-button-${componentData.tagName}`}
              >
                <img src={disclosure} className="expand-button"></img>
              </div>
            )}
            <div
              data-testid={`component-button-${componentData.tagName}`}
              className="tree-component-bar"
              onClick={handleHighlight}
            >
              &lt;
              <span className="component-name">{componentData.tagName}</span>
              /&gt;
            </div>
          </div>
          <Collapse
            in={open}
            timeout="auto"
            unmountOnExit
            tabIndex={0}
            style={{ paddingLeft: `${level}rem` }}
          >
            <div className="tree-component-content">
              {childrenState.map((item, index) => item)}
            </div>
          </Collapse>
        </div>
      ) : (
        <div
          data-testid={`component-leaf-${componentData.tagName}`}
          style={{ paddingLeft: `1rem` }}
          tabIndex={0}
          className="tree-component-bar"
          onClick={handleHighlight}
        >
          &lt;<span className="component-name">{componentData.tagName}</span>
          /&gt;
        </div>
      )}
    </div>
  );
};

export default TreeComponent;
