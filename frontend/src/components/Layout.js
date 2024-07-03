import { Box } from '@mui/material'
import React from 'react'
import SearchBox from './searchBox/SearchBox'
import TreeComponent from './Tree/TreeComponent'
import Header from './Header/Header'
import NotFound from './NotFound'
import Loading from './Loading'

const Layout = ({ children, searchValue, setSearchValue, setLoading, setTreeData, setError, treeData, loading, error }) => {
    return (
        <Box sx={{ minWidth: '380px' }}>
            <Header
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                setLoading={setLoading}
                setTreeData={setTreeData}
                setError={setError} />
            {error ? <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>{error}</Box> : searchValue ? !loading ? !treeData ? <NotFound /> : children : <Loading /> : <></>}
        </Box>
    )
}

export default Layout