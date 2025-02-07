<script lang="ts">
  import TreeComponent from '../../PanelComponents/TreeComponent/TreeComponent.svelte';
  import { Snapshot } from '../../types';

  export let rootComponentData: Snapshot;
</script>

<div class="pane-content">
  <div id="root-container" data-testid="root-container">
    {#if rootComponentData.rootComponent}
      <TreeComponent componentData={rootComponentData.rootComponent} level={1} />
    {/if}
  </div>
</div>

<style>
#root-container {
  padding-top: 2rem;
  padding-bottom: 2rem;
}

</style>
