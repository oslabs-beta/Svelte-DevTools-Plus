<script lang="ts">
  import { onMount } from 'svelte';
  import sendMessageToChrome from '../../../../../../../messenger';

  import { addNewEvent } from '../../Store/timedEvents';

  export let componentId: number;
  export let stateKey: any;
  export let initValue;

  let inputValue = String(initValue);
  let editing = false;

  async function handleSubmit() {
    try {
      const newState = { [stateKey]: inputValue };
      const [tab] = await chrome.tabs.query({
        active: true,
        lastFocusedWindow: true,
      });
      // Assuming Redux-like store management is adapted for Svelte
      addNewEvent({
        type: 'sendMessage',
        data: performance.now(),
      });
      sendMessageToChrome('injectState', {
        tab,
        componentId,
        newState,
      });
      editing = false;
    } catch (err) {
      console.error(err);
    }
  }

  function handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  }

  function handleChange(event: Event) {
    const input = event.target as HTMLInputElement;
    inputValue = input.value;
  }
</script>

<div class="state-modifier">
  {#if editing}
    <input
      class="state-mod-input"
      type="text"
      value={inputValue}
      on:blur={handleSubmit}
      on:keydown={handleKeyPress}
      on:input={handleChange}
      placeholder={inputValue}
    />
  {:else}
    <div
      class="state-display"
      on:click={() => {
        editing = true;
      }}
      data-testid={`modifier-${stateKey}`}
      aria-label="Modifiable State"
    >
      <p>{inputValue !== '' ? inputValue : '""'}</p>
    </div>
  {/if}
</div>

<style>
  .state-modifier {
    margin-left: 0.5rem;
  }

  .state-display {
    cursor: pointer;
    text-align: center;
    color: #ff6ce9;
    font-family: Menlo, monospace;
  }

  .state-mod-input {
    display: none;
  }
</style>
