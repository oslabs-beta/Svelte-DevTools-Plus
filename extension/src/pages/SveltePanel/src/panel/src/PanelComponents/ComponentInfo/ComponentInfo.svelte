<script lang="ts">
  import { highlightedComponent } from '../../Store/store';
  import StateValue from '../StateValue/StateValue.svelte';

  // Subscribe to the store
  let componentInfo = $highlightedComponent;
</script>

<div class="pane">
  <header>
    <h2>{componentInfo.tagName}</h2>
  </header>
  <div class="pane-content">
    <h3>State</h3>
    {#if componentInfo.detail.ctx.length > 0}
      <ul class="component-info-ul">
        {#each componentInfo.detail.ctx as state, index (state.key)}
          <li class="state-value">
            <p class="property-name">{state.key}:</p>
            <StateValue 
              value={state.value} 
              stateKey={state.key} 
              componentId={componentInfo.id} 
              isArray={Array.isArray(state)}
            />
          </li>
        {/each}
      </ul>
    {/if}

    <h3>Props</h3>
    {#if componentInfo.detail.attributes.length > 0}
      <ul class="component-info-ul">
        {#each componentInfo.detail.attributes as prop, index (prop.key)}
          <li class="state-value">
            <p class="property-name">{prop.key}:</p>
            <StateValue 
              value={prop.value} 
              stateKey={prop.key} 
              componentId={componentInfo.id} 
              isArray={Array.isArray(prop)}
            />
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</div>

<style>
  :root {
  /* --color: #eeeeee; */
  /* --color: gold; */
  /* --color: rgb(1, 184, 212); */
  --color: rgb(28, 195, 221);
}

.pane h2 {
  text-align: center;
  color: var(--color);
  margin: 0;
}

.pane h3 {
  color: var(--color);
  font-weight: 600;
  padding-left: 0.7rem;
}

.component-info-ul {
  list-style: none;
  padding-left: 1.5rem;
  width: 100%;
}

.pane li {
  margin: 0;
  padding: 0;
  margin-bottom: 1rem;
}

.pane li p {
  padding: 0;
  margin: 0;
}

.property-item {
  display: flex;
}
.property-name {
  /* color: #eeeeee; */
  color: #c6c6c6;
  font-family: Menlo, monospace;
}

.constant-property {
  font-family: Menlo, monospace;
  /* margin-left: 0.5rem; */
}

.state-value {
  display: flex;
  margin-bottom: 0.5rem;
}

#component-header {
  margin: 1rem;
  color: #eeeeee;
  border: none;
}
</style>
