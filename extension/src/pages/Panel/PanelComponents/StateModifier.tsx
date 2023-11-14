import React, { ChangeEvent, useRef, useState } from 'react';
import './StateModifier.css';

interface StateModifierProps {
  componentId: number;
  stateKey: string;
  initValue: number | string;
}

// When a state value is clicked on, it turns into this component.
// It's basically a text box that allows you to input data to modify the state.
const StateModifier = ({
  componentId,
  stateKey,
  initValue,
}: StateModifierProps) => {
  const [inputValue, setInputValue] = useState(initValue);
  const input = useRef<HTMLInputElement>(null);
  const display = useRef<HTMLInputElement>(null);

  function handleClickToEdit() {
    if (display.current === null || input.current === null) return;
    display.current.style.display = 'none';
    input.current.style.display = 'block';
    input.current.focus();
    input.current.select();
  }

  function finishEdit() {
    if (display.current === null || input.current === null) return;
    display.current.style.display = 'block';
    input.current.style.display = 'none';
    input.current.select();
    input.current.focus();
  }

  async function handleSubmit() {
    const newState = { [stateKey]: inputValue };
    const [tab] = await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true,
    });
    chrome.tabs.sendMessage(tab.id!, {
      message: 'injectState',
      componentId: componentId,
      newState: newState,
    });
    finishEdit();
  }

  function handleKeyPress(e: React.KeyboardEvent<HTMLDivElement>) {
    // Losing focus will call handleSubmit()
    if (e.code === 'Enter' && input.current !== null) input.current.blur();
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  return (
    <div className="state-modifier">
      <div>
        <input
          style={{ display: 'none' }}
          onKeyDown={handleKeyPress}
          ref={input}
          onBlur={handleSubmit}
          onChange={handleChange}
          placeholder={String(inputValue)}
        />
      </div>
      <div
        data-testid={`modifier-${stateKey}`}
        className="state-display"
        onClick={handleClickToEdit}
      >
        <p ref={display}>{inputValue !== '' ? inputValue : '""'}</p>
      </div>
    </div>
  );
};

export default StateModifier;
