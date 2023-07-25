import React from 'react';
import { useState } from 'react';
import { useMotionValue, Reorder } from 'framer-motion';
import { animate, MotionValue } from "framer-motion";
import { useEffect } from "react";

const inactiveShadow = "0px 0px 0px rgba(0,0,0,0.8)";

function useRaisedShadow(value: MotionValue<number>) {
  const boxShadow = useMotionValue(inactiveShadow);

  useEffect(() => {
    let isActive = false;
    value.onChange((latest) => {
      const wasActive = isActive;
      if (latest !== 0) {
        isActive = true;
        if (isActive !== wasActive) {
          animate(boxShadow, "5px 5px 10px rgba(0,0,0,0.3)");
        }
      } else {
        isActive = false;
        if (isActive !== wasActive) {
          animate(boxShadow, inactiveShadow);
        }
      }
    });
  }, [value, boxShadow]);

  return boxShadow;
}


interface Props {
  item: string;
}

const Item = ({ item }: Props) => {
  const y = useMotionValue(0);
  // const boxShadow = useRaisedShadow(y);

  return (
    <Reorder.Item value={item} id={item} style={{ y }}>
      <span>{item}</span>
    </Reorder.Item>
  );
};

const initialItems = ['🍅 Tomato', '🥒 Cucumber', '🧀 Cheese', '🥬 Lettuce'];

const Test = () => {
  const [items, setItems] = useState(initialItems);
  return (
    <Reorder.Group axis='y' onReorder={setItems} values={items}>
      {items.map((item) => (
        <Item key={item} item={item} />
      ))}
    </Reorder.Group>
  );
};

export default Test;
