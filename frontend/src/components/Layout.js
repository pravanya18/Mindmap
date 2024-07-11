import { Box } from '@mui/material'
import React from 'react'
import SearchBox from './searchBox/SearchBox'
import TreeComponent from './Tree/TreeComponent'
import Header from './Header/Header'
import NotFound from './NotFound'
import Loading from './Loading'
import Home from './Home'

const Layout = ({ children, searchValue, setSearchValue, setLoading, setTreeData, setError, setNodes, setEdges }) => {
    return (
        <Box sx={{ minWidth: '380px' }}>
            <Header
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                setLoading={setLoading}
                setTreeData={setTreeData}
                setError={setError}
                setEdges={setEdges}
                setNodes={setNodes}
            />

            {children}
        </Box>
    )
}

export default Layout