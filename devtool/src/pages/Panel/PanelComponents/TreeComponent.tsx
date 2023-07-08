import React, { useState } from 'react';
import './TreeComponent.css';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { selectSelectedComponent } from '../slices/selectedComponentSlice';

interface TreeComponentProps {
  component: string;
  state: Object | null;
  props: Object | null;
  children: Array<any> | null;
  level: number;
}

const TreeComponent: React.FC<TreeComponentProps> = ({
  component,
  state,
  props,
  children,
  level,
}: TreeComponentProps) => {
  const childrenState: Array<JSX.Element> = [];
  if (children) {
    children.forEach((i) => {
      childrenState.push(
        <TreeComponent
          component={i.component}
          state={i.state}
          props={i.props}
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
      type: "selectedComponent/setSelectedComponent",
      payload: {
        component: component,
        state: state,
        props: props
      },
    });

  }

  let componentString = '';
  componentString = componentString.concat('<', component, ' />');

  return (
    <div className="tree-component">
      <p style={{ paddingLeft: `${level}rem` }} onClick={handleClick}>
        {componentString}
      </p>
      {childrenState.map((item, index) => item)}
    </div>
  );
};

export default TreeComponent;
