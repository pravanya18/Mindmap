import { Box } from '@mui/material'
import React, { useState } from 'react'
import TreeComponent from './Tree/TreeComponent'
import SearchBox from './searchBox/SearchBox'
import Loading from './Loading'
import NotFound from './NotFound'
import MindMap from './MindMap/MindMap1'
import ReactflowMindMap from './MindMap/ReactFlow/ReactflowMindmap'

const Home = ({ searchValue, loading, treeData, error, setNodes, setEdges, edges, nodes }) => {

    return (
        <>
            {error ? <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>{error}</Box> : searchValue ? !loading ? !treeData ? <NotFound /> : <ReactflowMindMap setNodes={setNodes} setEdges={setEdges} edges={edges} nodes={nodes} /> : <Loading /> : <></>}
        </>
    )
}

export default Home