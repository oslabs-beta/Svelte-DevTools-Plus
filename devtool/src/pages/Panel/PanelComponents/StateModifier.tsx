import React, { ChangeEvent, useRef, useState } from 'react';
import './StateModifier.css';

interface StateModifierProps {
  componentId: number;
  stateKey: string;
  initValue: number | string;
}
const StateModifier = ({
  componentId,
  stateKey,
  initValue,
}: StateModifierProps) => {
  const [inputValue, setInputValue] = useState(initValue);

  const input = useRef<HTMLInputElement>(null!);
  const display = useRef<HTMLInputElement>(null!);

  function handleKeyPress(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.code !== 'Enter') return;
    handleSubmit();
  }
  function handleClickToEdit() {
    display.current.style.display = 'none';
    input.current.style.display = 'block';
    input.current.focus();
    input.current.select();
  }

  async function handleSubmit() {
    // Return if the type doesn't match
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

    // Since this function is asynchronous, I probably shouldn't exit out
    // of the input field until the asynchronous tasks have completed
    input.current.style.display = 'none';
    display.current.style.display = 'block';
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
      <div className="state-display" onClick={handleClickToEdit}>
        <p ref={display}>{inputValue}</p>
      </div>
    </div>
  );
};

export default StateModifier;