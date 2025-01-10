<script lang="ts">
  import { onMount } from 'svelte';
  import * as d3 from 'd3';

  interface TreeNode {
    name: string;
    children?: TreeNode[];
    attributes?: {
      department?: string;
    };
  }
  export let rootComponentData;


  const orgChart: TreeNode = {
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

  interface Point {
    x: number;
    y: number;
    data: {
      name: string;
    }
    children: Point;
  }

  let svg: SVGSVGElement;

  onMount(() => {
    const margin = {top: 40, right: 120, bottom: 20, left: 120};
    const width = svg.clientWidth - margin.left - margin.right;
    const height = svg.clientHeight - margin.top - margin.bottom;

    const treeLayout = d3.tree.size([height, width]);
    const root = d3.hierarchy(orgChart);
    treeLayout(root);

    const g = d3.select(svg)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const links = g.selectAll(".link")
      .data(root.links())
      .enter().append("path")
      .attr("class", "link")
      .attr("d", d3.linkHorizontal()
          .x((d: Point) => d.y)
          .y((d: Point) => d.x));

    const nodes = g.selectAll(".node")
      .data(root.descendants())
      .enter().append("g")
      .attr("class", "node")
      .attr("transform", (d: Point) => `translate(${d.y},${d.x})`);

    nodes.append("circle")
      .attr("r", 10);

    nodes.append("text")
      .attr("dy", "0.31em")
      .attr("x", (d: Point) => d.children ? -12 : 12)
      .style("text-anchor", (d: Point) => d.children ? "end" : "start")
      .text((d: Point) => d.data.name);
  });
</script>

<svelte:head>
  <style>
    .node circle {
      fill: steelblue;
      stroke: black;
      stroke-width: 1.5px;
    }

    .node text {
      font: 10px sans-serif;
    }

    .link {
      fill: none;
      stroke: #ccc;
      stroke-width: 2px;
    }
  </style>
</svelte:head>
<div>
  <svg bind:this={svg} width="960" height="600"></svg>
</div>