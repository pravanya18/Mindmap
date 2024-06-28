// import NodeModal from "../components/NodeModal";
import { Box, Stack } from "@mui/material";
import { useEffect, useState } from "react";
// import { CustomNodeElementProps, RawNodeDatum, TreeNodeDatum } from "react-d3-tree/lib/types/common";
// import { v4 } from "uuid";

import Tree from "react-d3-tree"
import './treeComponent.css'
import data from '../../treeData.json'



const TreeComponent = ({ data }) => {
    // console.log(data)

    const [orientation, setOrientation] = useState('horizontal');
    const [ox, setOx] = useState(100)
    const [oy, setOy] = useState(50)
    const [prev, setPrev] = useState(null)

    const handleNodeClick = (datum) => {

        // if (prev !== datum.__rd3t.collapsed) {
        //     setPrev(datum.__rd3t.collapsed)
        //     if (datum.__rd3t.collapsed) {
        //         if (orientation === 'vertical') {
        //             setOy(oy + 50)
        //         }
        //         else {
        //             setOx(ox + 50)

        //         }
        //     } else {
        //         if (orientation === 'vertical') {
        //             setOy(oy - 50)
        //         }
        //         else {
        //             setOx(ox - 50)
        //         }
        //     }
        // }
    };

    const textLayout = {
        vertical: {
            title: {
                textAnchor: 'start',
                x: 40,
            },
            attributes: {},
            attribute: {
                x: 40,
                dy: '1.2em',
            },
        },
        horizontal: {
            title: {
                y: 40,
            },
            attributes: {
                textAnchor: 'start',
                x: 0,
                y: 40,
            },
            attribute: {
                x: 0,
                dy: '1.2em',
            },
        },
    };
    const renderRectSvgNode = (customProps, onNodeClick) => {
        const { nodeDatum, toggleNode } = customProps;
        var rectWidth = (nodeDatum.name.split(' ').map(a => a.length).length == 0 ? nodeDatum.name.length : Math.max(...(nodeDatum.name.split(' ').map(a => a.length)))) * 2 + 110;
        var rectHeight = nodeDatum.name.split(' ').length * 10 + 50;
        console.log("node " + nodeDatum.name);
        console.log(" reatWidth " + Math.max(...(nodeDatum.name.split(' ').map(a => a.length))) + "  gg " + rectWidth);
        console.log(11 + "1")
        console.log(nodeDatum.name.split(' ').map(a => a.length).length == 0 ? nodeDatum.name.length : Math.max(...(nodeDatum.name.split(' ').map(a => a.length))) + 100);
        console.log(" len 12345");
        return (
            <>
                <g className="rd3t-label">
                    <filter id="drop-shadow">
                        <feDropShadow dx="2" dy="2" stdDeviation="0" />
                    </filter>
                    {/* <rect width={rectWidth} height={rectHeight} x={-18} y={-rectHeight / 2} filter="url(#drop-shadow)" onClick={() => { onNodeClick(nodeDatum); toggleNode() }} /> */}
                    <rect width={rectWidth} height={rectHeight} x={-10} y={-rectHeight / 2} onClick={() => { onNodeClick(nodeDatum); toggleNode() }} />

                    <text className="text-class"
                        x="0em" y={-(rectHeight / 2) + 13 + "px"} textAnchor="middle" alignmentBaseline="middle"
                    >
                        {nodeDatum.name.split(' ').map((word, index) => (
                            <tspan x="55px" dy={"1em"} key={index}>
                                {word}
                            </tspan>

                        ))}
                        {
                            nodeDatum.link ? (
                                <tspan x="55px" dy={"1.5em"}><a href={nodeDatum.link} target="_blank">Link</a></tspan>
                            ) : <></>
                        }
                    </text>
                </g>
            </>
        );
    };


    useEffect(() => {

        const handleResize = () => {
            // Check the screen width and update the orientation
            const newOrientation = window.innerWidth < 600 ? 'horizontal' : 'horizontal';
            setOrientation(newOrientation);
        };

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        // Initial orientation check
        handleResize();

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {

    }, [ox, oy])


    return (
        <>
            <Box sx={{ width: '100%', height: '70vh' }}>
                <Tree
                    data={data}
                    orientation={orientation}
                    dimensions={{
                        height: window.innerHeight,
                        width: window.innerWidth + 10
                    }}
                    centeringTransitionDuration={500}
                    translate={{
                        x: window.innerWidth / 2 - ((orientation === 'vertical') ? 0 : ox),
                        // x: window.innerWidth / 2 - 50,
                        y: window.innerHeight / 2 - ((orientation === 'vertical') ? oy : 0),
                    }}
                    collapsible={true}
                    shouldCollapseNeighborNodes={true}
                    initialDepth={1}
                    depthFactor={undefined}
                    zoomable={true}
                    draggable={true}
                    zoom={0.8}
                    // scaleExtent={{ min: 0.1, max: 1 }}
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
            </Box>
        </>
    );
}

export default TreeComponent 