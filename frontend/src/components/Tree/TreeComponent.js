import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Tree from "react-d3-tree";
import './treeComponent.css';
import treeData from '../../treeData.json';

const TreeComponent = ({ data }) => {
    const wrapperRef = useRef();
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [orientation, setOrientation] = useState('horizontal');

    const handleNodeClick = (datum) => {
        // Handle node click logic here if needed
    };

    const renderRectSvgNode = (customProps, onNodeClick) => {
        const { nodeDatum, toggleNode } = customProps;
        const rectWidth = (Math.max(...nodeDatum.name.split(' ').map(word => word.length)) * 2 + 110);
        const rectHeight = (nodeDatum.name.split(' ').length * 10 + 50);

        return (
            <g className="rd3t-label">
                <filter id="drop-shadow">
                    <feDropShadow dx="2" dy="2" stdDeviation="0" />
                </filter>
                {/* <rect width={rectWidth} height={rectHeight} x={-18} y={-rectHeight / 2} filter="url(#drop-shadow)" onClick={() => { onNodeClick(nodeDatum); toggleNode() }} /> */}
                <rect
                    width={rectWidth}
                    height={rectHeight}
                    x={-10}
                    y={-rectHeight / 2}
                    onClick={() => {
                        onNodeClick(nodeDatum);
                        toggleNode();
                    }}
                />
                <text className="text-class" x="0em" y="-1em" textAnchor="middle" alignmentBaseline="middle">
                    {nodeDatum.name.split(' ').map((word, index) => (
                        <tspan x="55px" dy={"1em"} key={index}>
                            {word}
                        </tspan>
                    ))}
                    {nodeDatum.link && (
                        <tspan x="55px" dy={"1.5em"}>
                            <a href={nodeDatum.link} target="_blank" rel="noopener noreferrer">
                                Link
                            </a>
                        </tspan>
                    )}
                </text>
            </g>
        );
    };

    useEffect(() => {
        const handleResize = () => {
            if (wrapperRef.current) {
                const { width, height } = wrapperRef.current.getBoundingClientRect();
                setDimensions({ width: width - 100, height });
                setOrientation(window.innerWidth < 600 ? 'horizontal' : 'horizontal');
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <Box ref={wrapperRef} sx={{ width: '95%', m: "auto", height: { xs: '80vh' }, bgcolor: '#2a2a35' }}>
            {dimensions.width > 0 && dimensions.height > 0 && (
                <Tree
                    data={data}
                    orientation={orientation}
                    dimensions={dimensions}
                    centeringTransitionDuration={500}
                    translate={{
                        x: dimensions.width < 600 ? 150 : dimensions.width / 2 - 100,
                        y: dimensions.height / 2,
                    }}
                    collapsible={true}
                    shouldCollapseNeighborNodes={true}
                    initialDepth={1}
                    zoomable={false}
                    draggable={true}
                    zoom={0.8}
                    separation={{ siblings: 0.9, nonSiblings: 30 }}
                    nodeSize={{ x: 200, y: 200 }}
                    enableLegacyTransitions={false}
                    transitionDuration={500}
                    renderCustomNodeElement={(nodeInfo) =>
                        renderRectSvgNode(nodeInfo, handleNodeClick)
                    }
                    rootNodeClassName="node__root"
                    branchNodeClassName="node__branch"
                    leafNodeClassName="node__leaf"
                />
            )}
        </Box>
    );
};

export default TreeComponent;
