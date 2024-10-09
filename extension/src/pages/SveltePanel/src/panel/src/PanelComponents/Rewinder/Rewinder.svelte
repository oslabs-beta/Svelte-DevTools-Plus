<script lang="ts">
  import { onMount } from 'svelte';

  export let numberOfSnapshots = 0;
  export let changeSnapshot: (snapshotIndex: number) => void;
  export let clearSnapshotHistory;

  let sliderValue = numberOfSnapshots;

  // Handle changes in numberOfSnapshots
  onMount(() => {
    $: if (numberOfSnapshots !== sliderValue) {
      sliderValue = numberOfSnapshots;
    }
  });

  function handleChange(event: Event) {
    const input = event.target as HTMLInputElement;
    sliderValue = Number(input.value);
  }

  function handleChangeCommitted() {
    changeSnapshot(sliderValue - 1);
  }

  function goBack() {
    if (sliderValue <= 1) return;
    changeSnapshot(sliderValue - 2);
    sliderValue -= 1;
  }

  function goForward() {
    if (sliderValue >= numberOfSnapshots) return;
    changeSnapshot(sliderValue);
    sliderValue += 1;
  }

  const disabled = numberOfSnapshots <= 1;
</script>

<div id="rewinder">
  <button on:click={clearSnapshotHistory} id="clear-button">
    Clear
  </button>
  <div id="slider-container">
    <input
      type="range"
      min="1"
      max={numberOfSnapshots}
      step="1"
      value={sliderValue}
      on:input={handleChange}
      on:change={handleChangeCommitted}
      disabled={disabled}
      class="slider"
    />
  </div>
  <button on:click={goBack} id="back-button">
    &lt;&lt;
  </button>
  <button on:click={goForward} id="forward-button">
    &gt;&gt;
  </button>
</div>

<style>
  /* Basic styling for slider and buttons */
  .slider {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 15px;
    background: #d3d3d3;
    outline: none;
    opacity: 0.7;
    -webkit-transition: .2s;
    transition: opacity .2s;
  }
  .slider:hover {
    opacity: 1;
  }
  .slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 25px;
    height: 25px;
    background: #4CAF50;
    cursor: pointer;
  }
  .slider::-moz-range-thumb {
    width: 25px;
    height: 25px;
    background: #4CAF50;
    cursor: pointer;
  }
  #rewinder {
  width: 100%;
  height: var(--rewinder-height);
  background-color: var(--main-bg-color);
  border: 0.5px solid #f7f7f7b5;
  box-shadow: 0px 0px 3px #c4c3c3;
  position: absolute;
  bottom: 0px;
  display: flex;
  border-radius: 8px;
}

#slider-container {
  width: 100%;
  height: 100%;
  margin-left: 3rem;
  margin-right: 3rem;
  display: flex;
  align-items: center;
}

#back-button,
#forward-button,
#clear-button {
  border: 0.5px solid #676767a7;
  width: 3rem;
  cursor: pointer;
  background-color: var(--main-bg-color);
  color: rgb(28, 195, 221);
  /* color: #eeeeee; */
}

#clear-button {
  font-size: 0.6rem;
  width: 100px;
}

#back-button:hover,
#forward-button:hover,
#clear-button:hover {
  background-color: #525c71; /*#444e62*/
  color: #eeeeee;
  opacity: 1;
}

.MuiSlider-track,
.MuiSlider-thumb {
  color: rgb(28, 195, 221);
}

.MuiSlider-rail {
  color: rgb(189, 236, 255);
}

.Mui-disabled {
  opacity: 0;
}

.css-17lmo96 {
  background-color: rgb(255, 255, 255) !important;
  width: 5px !important;
  height: 15px !important;
}

</style>
