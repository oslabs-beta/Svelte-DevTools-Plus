<script lang="ts">
  import { writable, get } from 'svelte/store';
  import type { Component } from '../../types'
  import {
    setHighlightedComponent,
  } from '../../Store/highlightedComponent';
  import 
    {highlightedComponent} from '../../Store/store'
  

  export let componentData: Component;
  export let level;

  let open = false;

  function toggleOpen() {
    open = !open;
  }

  function handleHighlight() {
    setHighlightedComponent(componentData);
  }

  $: highlighted = get(highlightedComponent)?.id === componentData.id;
</script>

<div tabindex="0" class:highlighted>
  {#if componentData.children && componentData.children.length > 0}
    <div>
      <button on:click={toggleOpen} class="expand-button-container">
        <img
          src={open ? 'path/to/disclosure-open.png' : 'path/to/disclosure.png'}
          alt="Toggle Children"
          class="expand-button"
        />
      </button>
      <button on:click={handleHighlight} class="tree-component-bar">
        &lt;<span class="component-name">{componentData.tagName}</span>&gt;
      </button>
      {#if open}
        <div
          style="padding-left: {level + 'rem'}"
          class="tree-component-content"
        >
          {#each componentData.children as child (child.id)}
            <svelte:self {child} level={level + 1} />
          {/each}
        </div>
      {/if}
    </div>
  {:else}
    <button on:click={handleHighlight} class="tree-component-bar">
      &lt;<span class="component-name">{componentData.tagName}</span>&gt;
    </button>
  {/if}
</div>

<style>
  :root {
    --background: rgb(53, 43, 60, 00);
    --background-hover: rgb(144, 144, 203, 0.25);
    --background-focused: rgba(85, 59, 104, 0.5);
    --highlight: rgba(161, 255, 247, 0.25);
    --cyan: rgb(0, 136, 157);
    --darker-cyan: rgb(0, 94, 108);
    --darkest-cyan: rgb(0, 65, 75);

    --grey: rgb(51, 51, 51);
    --black: rgb(38, 38, 38);
    --lightGrey: rgb(235, 235, 235);
  }

  .Collapsible__trigger {
    cursor: pointer;
    width: 100rem;
  }

  .Collapsible__trigger:focus {
    background-color: var(--darkest-cyan);
  }

  .Collapsible__trigger:hover {
    background: var(--darker-cyan);
  }

  .Collapsible {
    overflow: visible;
  }

  .Collapsible__contentOuter {
    background-color: rgb(00, 00, 00, 00);
    overflow: visible;
  }
  .Collapsible__contentInner {
    padding-left: 1rem;
    border: 1px solid var(--lightGrey);
    border-top: 0;

    p {
      margin-bottom: 10px;
      font-size: 14px;
      line-height: 20px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .Collapsible__trigger {
    display: block;
    font-weight: 400;
    text-decoration: none;
    position: relative;
    padding: 0rem;
    background: var(--cyan);
    color: white;

    &:after {
      font-family: 'FontAwesome';
      content: '\f107';
      position: absolute;
      right: 10px;
      top: 10px;
      display: block;
      transition: transform 300ms;
    }

    &.is-open {
      &:after {
        transform: rotateZ(180deg);
      }
    }

    &.is-disabled {
      opacity: 0.5;
      background-color: grey;
    }
  }

  .CustomTriggerCSS {
    background-color: lightcoral;
    transition: background-color 200ms ease;
  }

  .CustomTriggerCSS--open {
    background-color: darkslateblue;
  }

  .Collapsible__custom-sibling {
    padding: 5px;
    font-size: 12px;
    background-color: #cbb700;
    color: black;
  }

  .MuiCollapse-root {
    background-color: rgba(0, 0, 0, 0);
  }

  .tree-component-bar {
    width: 100%;
    height: 1rem;
    margin-bottom: 2px;
    font-family: Menlo, monospace;
    color: rgb(201, 201, 201);
    background-color: var(--background);
    user-select: none;
    border: none;
    text-align: left;
  }

  .tree-component-bar:hover {
    background-color: var(--background-hover);
    cursor: pointer;
  }

  .tree-component-bar:active {
    background-color: var(--background-focused);
    cursor: pointer;
  }

  .tree-component-bar:focus {
    background-color: var(--highlight);
    cursor: pointer;
  }

  .tree-component-bar:focus {
    cursor: pointer;
  }

  .tree-component {
    display: flex;
  }

  .component-name {
    color: rgb(28, 195, 221);
  }

  .expand-button {
    height: 1rem;
    width: 1rem;
    background-color: rgba(0, 0, 0, 0);
    cursor: pointer;
  }

  .expand-button-container {
    height: 1rem;
    background-color: rgba(0, 0, 0, 0);
    width: 1rem;
    border: none;
  }

  #tree-content {
    height: 100%;
    border-radius: 0.5rem;
    background-color: rgba(255, 255, 255, 0.1);
  }

  #tree {
    margin-bottom: 10rem;
  }

  .highlighted {
    background-color: lightblue; /* Example of highlighting */
  }
</style>
