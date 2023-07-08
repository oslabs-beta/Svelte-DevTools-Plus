import React, { useState } from 'react';
import './TreeComponent.css';
import { v4 as uuidv4 } from 'uuid';

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

  const [focused, setFocused] = useState(false);
  const [open, setOpen] = useState(false);

  function handleClick() {
    setOpen(open ? false : true);
  }

  let componentString = '';
  // for (let i = 0; i < level; i++) {
  //   stringToDisplay = stringToDisplay.concat('....');
  // }
  componentString = componentString.concat('<', component, ' />');

  return (
    <div className="tree-component">
      <p style={{ paddingLeft: `${level}rem` }} onClick={handleClick}>
        {componentString}
      </p>
      {/* <p>Component state: {JSON.stringify(state)}</p>
    <p>Component props: {JSON.stringify(props)}</p> */}
      {/* <p>Children:</p> */}

      {open
        ? childrenState.map((item, index) => {
            console.log('item', item);
            return item;
          })
        : null}
    </div>
  );
};

export default TreeComponent;
