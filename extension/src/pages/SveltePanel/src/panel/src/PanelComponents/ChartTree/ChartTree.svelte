<!-- <script lang="ts">
  import { onMount } from 'svelte';
  import * as d3 from 'd3';
  import './custom-tree.css';

  let orgChart = {
    name: 'CEO',
    children: [
      {
        name: 'Manager',
        attributes: {
          department: 'Production',
        },
        children: [
          {
            name: 'Foreman',
            attributes: {
              department: 'Fabrication',
            },
            children: [{ name: 'Worker' }],
          },
          {
            name: 'Foreman',
            attributes: {
              department: 'Assembly',
            },
            children: [{ name: 'Worker' }],
          },
        ],
      },
    ],
  };

  let treeWrapper;
  let translate = { x: 0, y: 0 };

  onMount(() => {
    const width = treeWrapper.clientWidth;
    const height = treeWrapper.clientHeight;
    translate = { x: width / 2, y: height / 2 };
    drawTree();
  });

  function drawTree() {
    const svg = d3.select(treeWrapper)
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .append('g')
      .attr('transform', `translate(${translate.x}, ${translate.y})`);

    const root = d3.hierarchy(orgChart);
    const treeLayout = d3.tree().size([400, 300]);
    treeLayout(root);

    const nodes = svg.selectAll('.node')
      .data(root.descendants())
      .enter().append('g')
      .attr('transform', d => `translate(${d.y},${d.x})`);

    nodes.append('circle')
      .attr('r', 10)
      .on('click', d => handleNodeClick(d));

    nodes.append('text')
      .attr('x', 20)
      .text(d => `${d.data.name} (click me to toggle 👋)`)
      .on('click', d => toggleNode(d));

    if (d => d.data.attributes?.department) {
      nodes.append('text')
        .attr('x', 20)
        .attr('dy', 20)
        .text(d => `Department: ${d.data.attributes.department}`);
    }
  }

  function toggleNode(d) {
    // Logic to toggle nodes (expand/collapse)
  }

  function handleNodeClick(d) {
    console.log(`Clicked ${d.data.name}, type: ${d.children ? 'branch' : 'leaf'}`);
  }
</script>

<div bind:this={treeWrapper} class="tree-container" style="width: 50em; height: 20em;"></div> -->
