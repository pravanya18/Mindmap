import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { Box } from '@mui/material';
import ReactFlow, {
    Controls,
    useNodesState,
    useEdgesState,
    ReactFlowProvider,
    Panel,
    useReactFlow,
    useViewport,
    useStore
} from 'reactflow';
import dagre from 'dagre';

import 'reactflow/dist/style.css';
import CustomNode from './CustomNode';
// const nodeTypes = { customNode: CustomNode };

const initialNodes = [
    { id: '1', type: 'customNode', data: { label: 'Main Topic', link: 'https://example.com/main', definition: 'Main topic definition' }, position: { x: 0, y: 0 } },
    { id: '2', type: 'customNode', data: { label: 'Sub Topic 1', link: 'https://example.com/sub1', definition: 'Sub topic 1 definition' }, position: { x: 0, y: 0 } },
    { id: '3', type: 'customNode', data: { label: 'Sub Topic 2', link: 'https://example.com/sub2', definition: 'Sub topic 2 definition' }, position: { x: 0, y: 0 } },
    { id: '4', type: 'customNode', data: { label: 'Sub Topic 1.1', link: 'https://example.com/sub1.1', definition: 'Sub topic 1.1 definition' }, position: { x: 0, y: 0 } },
    { id: '5', type: 'customNode', data: { label: 'Sub Topic 1.2', link: 'https://example.com/sub1.2', definition: 'Sub topic 1.2 definition' }, position: { x: 0, y: 0 } },
    { id: '6', type: 'customNode', data: { label: 'Sub Topic 2.1', link: 'https://example.com/sub2.1', definition: 'Sub topic 2.1 definition' }, position: { x: 0, y: 0 } },
    { id: '7', type: 'customNode', data: { label: 'Sub Topic 2.2', link: 'https://example.com/sub2.2', definition: 'Sub topic 2.2 definition' }, position: { x: 0, y: 0 } },
    { id: '8', type: 'customNode', data: { label: 'Sub Topic 1.1.1', link: 'https://example.com/sub1.1.1', definition: 'Sub topic 1.1.1 definition' }, position: { x: 0, y: 0 } },
    { id: '9', type: 'customNode', data: { label: 'Sub Topic 1.1.2', link: 'https://example.com/sub1.1.2', definition: 'Sub topic 1.1.2 definition' }, position: { x: 0, y: 0 } },
    { id: '10', type: 'customNode', data: { label: 'Sub Topic 2.1.1', link: 'https://example.com/sub2.1.1', definition: 'Sub topic 2.1.1 definition' }, position: { x: 0, y: 0 } },
    { id: '11', type: 'customNode', data: { label: 'Sub Topic 2.1.2', link: 'https://example.com/sub2.1.2', definition: 'Sub topic 2.1.2 definition' }, position: { x: 0, y: 0 } },
];



const initialEdges = [
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e1-3', source: '1', target: '3' },
    { id: 'e2-4', source: '2', target: '4' },
    { id: 'e2-5', source: '2', target: '5' },
    { id: 'e3-6', source: '3', target: '6' },
    { id: 'e3-7', source: '3', target: '7' },
    { id: 'e4-8', source: '4', target: '8' },
    { id: 'e4-9', source: '4', target: '9' },
    { id: 'e6-10', source: '6', target: '10' },
    { id: 'e6-11', source: '6', target: '11' },
];


const nodeWidth = 172;
const nodeHeight = 36;

const getLayoutedElements = (nodes, edges, direction = 'TB') => {
    const dagreGraph = new dagre.graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));

    const isHorizontal = direction === 'LR';
    dagreGraph.setGraph({ rankdir: direction });

    nodes.forEach((node) => {
        dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });

    edges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    const layoutedNodes = nodes.map((node) => {
        const nodeWithPosition = dagreGraph.node(node.id);
        node.targetPosition = isHorizontal ? 'left' : 'top';
        node.sourcePosition = isHorizontal ? 'right' : 'bottom';

        if (nodeWithPosition) {
            node.position = {
                x: nodeWithPosition.x - nodeWidth / 2,
                y: nodeWithPosition.y - nodeHeight / 2,
            };
        }

        return node;
    });

    return { nodes: layoutedNodes, edges };
};

const LayoutFlow = () => {

    const [nodes, setNodes] = useNodesState(initialNodes);
    const [edges, setEdges] = useEdgesState(initialEdges);

    const isLeafNode = (nodeId) => {
        return edges.filter(edge => edge.source === nodeId).length === 0;
    };

    const nodeTypes = useMemo(
        () => ({
            customNode: (node) => (
                <CustomNode
                    node={node}
                    isLeaf={isLeafNode(node.id)}
                />
            ),
        }),
        [],
    );


    useEffect(() => {
        const handleResize = () => {
            console.log("Resizing...")
            const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
                initialNodes,
                initialEdges
            );
            setNodes(layoutedNodes);
            setEdges(layoutedEdges);
        }

        // window.addEventListener('resize', handleResize);
        handleResize();
        // return () => window.removeEventListener('resize', handleResize);

    }, [setNodes, setEdges]);


    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            // onConnect={null}
            proOptions={{ hideAttribution: true }}
            nodeTypes={nodeTypes}
            fitView
        >
            <Panel position="top-left">MindBloom</Panel>
            <Controls security='restricted' showInteractive={false} showZoom={false} />
        </ReactFlow>
    )
}



const ReactflowMindMap = () => {

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '98%',
                height: '70vh',
                m: 'auto',
                border: '1px solid #ccc',
            }}
        >
            <ReactFlowProvider>
                <LayoutFlow />
            </ReactFlowProvider>
        </Box>
    );
};


export default ReactflowMindMap