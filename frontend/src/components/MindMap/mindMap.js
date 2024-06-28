import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const MindMap = ({ data }) => {
    const svgRef = useRef();
    const wrapperRef = useRef();

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        const { width, height } = wrapperRef.current.getBoundingClientRect();

        svg.attr('width', width).attr('height', height);

        const root = d3.hierarchy(data);
        const treeLayout = d3.tree().size([height, width - 160]);
        treeLayout(root);

        svg.selectAll('*').remove(); // Clear previous content

        // Create links
        svg.selectAll('path')
            .data(root.links())
            .enter()
            .append('path')
            .attr('d', d3.linkHorizontal()
                .x(d => d.y)
                .y(d => d.x))
            .attr('fill', 'none')
            .attr('stroke', '#ccc');

        // Create nodes
        const nodes = svg.selectAll('.node')
            .data(root.descendants())
            .enter()
            .append('g')
            .attr('class', 'node')
            .attr('transform', d => `translate(${d.y},${d.x})`);

        nodes.append('circle')
            .attr('r', 5)
            .attr('fill', '#fff')
            .attr('stroke', '#4caf50')
            .attr('stroke-width', '2px');

        // Add labels
        nodes.append('text')
            .attr('dy', '-1rem')
            .attr('x', d => d.children ? 0 : 10) // Adjust text position based on children presence
            .attr('text-anchor', 'top')
            .attr('width', 50) // Fixed width for text
            .text(d => d.data.name)
            .style('word-wrap', 'break-word')

        // Adjust SVG size and layout on resize
        const handleResize = () => {
            const { width, height } = wrapperRef.current.getBoundingClientRect();
            svg.attr('width', width).attr('height', height);
            treeLayout.size([height, width - 160]);
            treeLayout(root);

            svg.selectAll('path')
                .attr('d', d3.linkHorizontal()
                    .x(d => d.y)
                    .y(d => d.x));

            svg.selectAll('.node')
                .attr('transform', d => `translate(${d.y},${d.x})`);

            svg.selectAll('text')
                .attr('x', d => d.children ? -10 : 10); // Adjust text position based on children presence
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);

    }, [data]);

    return (
        <div ref={wrapperRef} style={{ width: '95%', height: '100vh', overflow: 'auto', margin: 'auto', marginTop: '3rem' }}>
            <svg ref={svgRef}></svg>
        </div>
    );
};

export default MindMap;
