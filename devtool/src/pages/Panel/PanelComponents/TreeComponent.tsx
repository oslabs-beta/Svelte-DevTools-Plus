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
      // Change the style so this tab is selected
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
              <img
                src={disclosureOpen}
                onClick={handleExpand}
                className="expand-button"
              ></img>
            ) : (
              <img
                src={disclosure}
                onClick={handleExpand}
                className="expand-button"
              ></img>
            )}
            <div className="tree-component-bar" onClick={handleHighlight}>
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
            {/* <summary onClick={handleClick}>{componentString}</summary> */}
            <div className="tree-component-content">
              {childrenState.map((item, index) => item)}
            </div>
          </Collapse>
        </div>
      ) : (
        <div
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

// KNOWN ISSUE: onOpen and onClick won't call handleClick on the
// app component after an update it might be a bug with Collapsible
// maybe try a different library, or vanilla HTML. At least I can
// keep my windows open now

export default TreeComponent;
