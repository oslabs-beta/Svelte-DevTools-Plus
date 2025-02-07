<script lang="ts">
  import StateModifier from '../StateModifier/StateModifier.svelte';
  import Highlight from "svelte-highlight";
  import typescript from "svelte-highlight/languages/typescript";

  export let value;
  export let stateKey;
  export let componentId;
  export let isArray;

  // Function to replace tabs with spaces for better formatting in code blocks
  function replaceTabsWithSpaces(string: string): String {
    return string.replace(/\t/g, '  ');
  }
</script>

<div class="property-item" data-testid={`state-value-${stateKey}`}>
  {#if Array.isArray(value)}
    <details class="state-value-array">
      <summary class="state-value-summary">Array [{value.length}]</summary>
      <ul>
        {#each value as item, index}
          <li class="component-info-array-list-item">
            <svelte:self {item} {stateKey} {componentId} isArray={true} />
          </li>
        {/each}
      </ul>
    </details>
  {:else if value === null}
    'null'
  {:else if value === false}
    'false'
  {:else if value === true}
    'true'
  {:else if typeof value === 'number' || typeof value === 'string'}
    {#if !isArray}
      <StateModifier {componentId} {stateKey} initValue={value} />
    {:else}
      <div>{value}</div>
    {/if}
  {:else if typeof value === 'object'}
    {#if 'isFunction' in value && value.__isFunction}
      <div>
        <details>
          <summary class="constant-property state-value-summary">function</summary>
          <div class="function-definition">
            <Highlight language={typescript} code={replaceTabsWithSpaces(value.source)} />
          </div>
        </details>
      </div>
    {/if}
  {/if}
</div>

<style>
.property-item {
  margin-left: 0.25rem;
}

li .component-info-array-list-item {
  margin-bottom: 0;
  list-style: none;
}

.state-value-summary {
  /* color: rgb(117, 117, 255); */
  color: rgb(207, 142, 253);
}

.function-definition {
  padding-right: 1rem;
}

/*react-syntax-highligher was enforcing overflow-x. This was creating
an ugly effect when expanding the window */
.code-block {
  overflow: visible !important;
}

</style>
