// src/NetworkGraph.js

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import yaml from 'js-yaml';

const NetworkGraph = ({ yamlContent }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!yamlContent) return;

    const data = parseYAML(yamlContent);
    const { nodes, edges } = generateNodesAndEdges(data);

    // Log nodes and edges for debugging
    console.log("Nodes:", nodes);
    console.log("Edges:", edges);

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear existing content

    const width = 800;
    const height = 600;

    const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(edges).id(d => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg.append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(edges)
      .enter().append("line")
      .attr("stroke-width", 1.5)
      .attr("stroke", "#999");

    const node = svg.append("g")
      .attr("class", "nodes")
      .selectAll("circle")
      .data(nodes)
      .enter().append("circle")
      .attr("r", 5)
      .attr("fill", "#69b3a2")
      .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

    const label = svg.append("g")
      .attr("class", "labels")
      .selectAll("text")
      .data(nodes)
      .enter().append("text")
      .attr("dy", -3)
      .attr("dx", 7)
      .text(d => d.id)
      .style("font-size", "12px")
      .style("fill", "#333");

    simulation.on("tick", () => {
      link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

      node
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);

      label
        .attr("x", d => d.x)
        .attr("y", d => d.y);
    });

    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    function parseYAML(yamlStr) {
      return yaml.load(yamlStr);
    }

    function generateNodesAndEdges(data) {
      const nodes = [];
      const edges = [];

      // Add nodes
      for (const [key, value] of Object.entries(data.nodes)) {
        nodes.push({ id: key });
      }

      // Add edges for node_diffusion
      if (data.node_diffusion) {
        for (const [diffKey, diffValue] of Object.entries(data.node_diffusion)) {
          edges.push({
            source: diffValue.node1,
            target: diffValue.node2
          });
        }
      }

      // Ensure all nodes referenced in edges exist in the nodes array
      const nodeIds = nodes.map(node => node.id);
      edges.forEach(edge => {
        if (!nodeIds.includes(edge.source)) {
          console.error(`Node not found: ${edge.source}`);
        }
        if (!nodeIds.includes(edge.target)) {
          console.error(`Node not found: ${edge.target}`);
        }
      });

      return { nodes, edges };
    }

  }, [yamlContent]);

  return <svg ref={svgRef} width="800" height="600"></svg>;
};

export default NetworkGraph;
