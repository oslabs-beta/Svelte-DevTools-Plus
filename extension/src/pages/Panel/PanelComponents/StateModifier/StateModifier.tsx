import React, { ChangeEvent, useRef, useState } from 'react';
import './StateModifier.css';
import sendMessageToChrome from '../../../../messenger';

interface StateModifierProps {
  componentId: number;
  stateKey: string;
  initValue: number | string;
}
/*
  The StateModifier component is a modifiable piece of state for the 
  selected component. When the user clicks on it, the text transforms into 
  a text input field. Then when the user and hits enter, or clicks 
  somewhere else, the text in the input field gets injected into the
  Svelte component
*/
const StateModifier = ({
  componentId,
  stateKey,
  initValue,
}: StateModifierProps) => {
  const [inputValue, setInputValue] = useState(String(initValue));
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
    if (!display.current || !input.current) return;
    display.current.style.display = 'block';
    input.current.style.display = 'none';
  }

  async function handleSubmit() {
    try {
      const newState = { [stateKey]: inputValue };
      const [tab] = await chrome.tabs.query({
        active: true,
        lastFocusedWindow: true,
      });
      sendMessageToChrome('injectState', {
        tab: tab,
        componentId,
        newState,
      });
      finishEdit();
    } catch (err) {
      console.log(err);
    }
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
          aria-label="New State Input"
          className="state-mod-input"
          onKeyDown={handleKeyPress}
          ref={input}
          onBlur={handleSubmit}
          onChange={handleChange}
          placeholder={String(inputValue)}
        />
      </div>
      <div
        aria-label="Modifiable State"
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
