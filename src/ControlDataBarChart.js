import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const ControlDataBarChart = ({ controlData }) => {
  const svgRef = useRef();

  useEffect(() => {
    const data = [];

    Object.entries(controlData).forEach(([processName, dataEntry]) => {
      dataEntry.control_data.ts_data.forEach((ts) => {
        ts.series.forEach((entry) => {
          data.push({
            processName,
            time: entry[0],
            value: entry[1],
          });
        });
      });
    });

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // Clear previous content

    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const x = d3.scaleBand()
      .domain(data.map(d => d.time))
      .range([0, width])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)])
      .nice()
      .range([height, 0]);

    const color = d3.scaleOrdinal()
      .domain(data.map(d => d.processName))
      .range(d3.schemeCategory10);

    const xAxis = g => g
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x).tickSizeOuter(0))
      .selectAll('text')
      .attr('transform', 'rotate(-40)')
      .style('text-anchor', 'end');

    const yAxis = g => g
      .call(d3.axisLeft(y))
      .call(g => g.select('.domain').remove())
      .call(g => g.append('text')
        .attr('fill', '#000')
        .attr('x', -margin.left)
        .attr('y', 10)
        .attr('text-anchor', 'start')
        .text('kWh'));

    const barGroup = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    barGroup.selectAll('.bar')
      .data(data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.time))
      .attr('y', d => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', d => height - y(d.value))
      .attr('fill', d => color(d.processName));

    barGroup.append('g')
      .call(xAxis);

    barGroup.append('g')
      .call(yAxis);

  }, [controlData]);

  return (
    <div>
      <h3>Control Data</h3>
      <svg ref={svgRef} width="600" height="400"></svg>
    </div>
  );
};

export default ControlDataBarChart;
