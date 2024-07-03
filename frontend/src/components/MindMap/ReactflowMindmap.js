import React, { useCallback, useEffect } from 'react';
import { Box } from '@mui/material';
import ReactFlow, {
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    ReactFlowProvider,
} from 'reactflow';
import dagre from 'dagre';

import 'reactflow/dist/style.css';

const initialNodes = [
    { id: '1', data: { label: 'Main Topic' }, position: { x: 0, y: 0 } },
    { id: '2', data: { label: 'Sub Topic 1' }, position: { x: 0, y: 0 } },
    { id: '3', data: { label: 'Sub Topic 2' }, position: { x: 0, y: 0 } },
    { id: '4', data: { label: 'Sub Topic 1.1' }, position: { x: 0, y: 0 } },
    { id: '5', data: { label: 'Sub Topic 1.2' }, position: { x: 0, y: 0 } },
    { id: '6', data: { label: 'Sub Topic 2.1' }, position: { x: 0, y: 0 } },
    { id: '7', data: { label: 'Sub Topic 2.2' }, position: { x: 0, y: 0 } },
    { id: '8', data: { label: 'Sub Topic 1.1.1' }, position: { x: 0, y: 0 } },
    { id: '9', data: { label: 'Sub Topic 1.1.2' }, position: { x: 0, y: 0 } },
    { id: '10', data: { label: 'Sub Topic 2.1.1' }, position: { x: 0, y: 0 } },
    { id: '11', data: { label: 'Sub Topic 2.1.2' }, position: { x: 0, y: 0 } },
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

const ReactflowMindMap = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

    useEffect(() => {
        const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
            initialNodes,
            initialEdges
        );
        setNodes(layoutedNodes);
        setEdges(layoutedEdges);
    }, [setNodes, setEdges]);

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '70vh',
            }}
        >
            <ReactFlow
                nodes={nodes}
                edges={edges}
                // onNodesChange={onNodesChange}
                // onEdgesChange={onEdgesChange}
                onConnect={null}
                fitView
            >
                {/* <MiniMap /> */}
                <Controls security='restricted' />
                <Background variant='lines' />
            </ReactFlow>
        </Box>
    );
};


export default ReactflowMindMap