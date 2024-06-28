import { Box } from '@mui/material'
import React from 'react'
import SearchBox from './searchBox/SearchBox'
import TreeComponent from './Tree/TreeComponent'
import Header from './Header/Header'

const Layout = ({ children, searchValue, setSearchValue, setLoading, setTreeData, setError }) => {
    return (
        <Box sx={{ minWidth: '380px' }}>
            <Header
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                setLoading={setLoading}
                setTreeData={setTreeData}
                setError={setError} />
            {children}
        </Box>
    )
}

export default Layout