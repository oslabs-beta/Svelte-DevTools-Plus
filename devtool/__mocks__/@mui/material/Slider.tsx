// Mock MUI slider. When clicked it updates to snapshot #2
import React from 'react';

interface SliderProps {
  onChange: (event: null, value: number) => void;
  onChangeCommitted: (event: null, value: number) => void;
}

function Slider(props: SliderProps) {
  function handleClick() {
    props.onChange(null, 2);
    props.onChangeCommitted(null, 2);
  }
  return (
    <div data-testid="rewinder-slider" onClick={handleClick}>
    </div>
  );
}
export default Slider;
