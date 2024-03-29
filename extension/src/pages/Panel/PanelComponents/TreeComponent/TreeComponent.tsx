import React, { useCallback, useEffect, useState } from 'react';
import './TreeComponent.css';
import { useDispatch } from 'react-redux';
import {
  Component,
  selectHighlightedComponent,
} from '../../slices/highlightedComponentSlice';
import { useSelector } from 'react-redux';
import { Collapse } from '@mui/material';
import disclosure from '../../disclosure.png';
import disclosureOpen from '../../disclosure-open.png';

interface TreeComponentProps {
  componentData: Component;
  level: number;
}

/*
  A TreeComponent is each component in the list visualization page.
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
        <TreeComponent componentData={child} level={1} key={child.id} />
      );
    });
  }

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
  }, [componentData]);

  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleExpand = useCallback(
    function () {
      setOpen(open ? false : true);
    },
    [open]
  );

  const handleHighlight = useCallback(
    function () {
      dispatch({
        type: 'highlightedComponent/setHighlightedComponent',
        payload: {
          tagName: componentData.tagName,
          detail: componentData.detail,
          id: componentData.id,
        },
      });
    },
    [dispatch]
  );

  const collapsePadding = `${level}rem`;
  return (
    <div tabIndex={0}>
      {childrenState.length > 0 ? (
        <div>
          <div className="tree-component">
            {open ? (
              <button
                className="expand-button-container"
                onClick={handleExpand}
                data-testid={`collapse-button-${componentData.tagName}`}
              >
                <img src={disclosureOpen} className="expand-button"></img>
              </button>
            ) : (
              <button
                className="expand-button-container"
                onClick={handleExpand}
                data-testid={`expand-button-${componentData.tagName}`}
              >
                <img src={disclosure} className="expand-button"></img>
              </button>
            )}
            <button
              data-testid={`component-button-${componentData.tagName}`}
              className="tree-component-bar"
              onClick={handleHighlight}
            >
              &lt;
              <span className="component-name">{componentData.tagName}</span>
              /&gt;
            </button>
          </div>
          <Collapse
            in={open}
            timeout="auto"
            unmountOnExit
            style={{ paddingLeft: collapsePadding }}
          >
            <div className="tree-component-content">
              {childrenState.map((item) => item)}
            </div>
          </Collapse>
        </div>
      ) : (
        <button
          data-testid={`component-leaf-${componentData.tagName}`}
          style={{ paddingLeft: `1rem` }}
          tabIndex={0}
          className="tree-component-bar"
          onClick={handleHighlight}
        >
          &lt;<span className="component-name">{componentData.tagName}</span>
          /&gt;
        </button>
      )}
    </div>
  );
};

export default TreeComponent;
