import React, { useState } from 'react'
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { Box, Typography, Button, Divider, Grid, ButtonBase } from "@mui/material"
import { formGraphStructure } from '../../util';

const Search = styled('div')(({ theme }) => ({
    // position: { xs: 'fixed', md: 'relative' },
    borderRadius: theme.shape.borderRadius,
    // backgroundColor: alpha(theme.palette.common.white, 0.15),
    // '&:hover': {
    //     backgroundColor: alpha(theme.palette.common.white, 0.25),
    // },
    [theme.breakpoints.up('xs')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        // padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(0)})`,
        flexGrow: 1,
        color: 'black',
        borderWidth: 'thin',
        borderStyle: 'solid',
        borderRadius: '1rem',
        fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
        backgroundColor: '#f0f0f0',
        [theme.breakpoints.up('md')]: {
            width: '20rem',
        }
    },
}));

const StyledSearchButton = styled(ButtonBase)(({ theme }) => ({
    // color: 'red',
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(0)})`,
    width: '5rem',
    color: 'white',
    cursor: 'pointer',
    marginLeft: '0.5rem',
    // width: "6rem",
    height: "auto",
    borderColor: "#17664e",
    borderWidth: "2px",
    borderStyle: "solid",
    borderRadius: "1rem",
    backgroundColor: "#4c8087",
    fontSize: "0.8rem",
}));

const SearchBox = ({ setSearchValue, setLoading, setTreeData, setError, setNodes, setEdges }) => {

    const [search, setSearch] = useState("")

    const fetchData = async (word) => {
        setLoading(true)
        try {
            setNodes([])
            setEdges([])
            //  const response = await axios.get(`${process.env.REACT_APP_server_url}data/${word}`)
            const response = await axios.post(`https://us-central1-neethu-ml.cloudfunctions.net/mind-map-2`, { keyword: word })
            console.log(response);
            const resp = await formGraphStructure(response.data)
            setEdges(resp.initialEdges)
            setNodes(resp.initialNodes)
            setTreeData({ initialNodes: resp.initialNodes, initialEdges: resp.initialEdges })
            console.log("Done... ")
        } catch (e) {
            console.log(e.response)
            setTreeData(null)
            if (e.response) {
                setError(e.response.data.message)
            }

            console.log(e)
        }
        setLoading(false)
    }

    const handleSearchClick = (e) => {
        setSearch(e.target.value)
        setError(null)
    }

    const handleSearchSubmit = async (e) => {
        if (search === "") {
            setError("Enter a topic to generate mindmap");
            return;
        }
        setSearchValue(search)
        console.log(search)
        fetchData(search.toLowerCase());
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            <StyledInputBase
                placeholder="Enter a topic to generate a mindmap "
                inputProps={{ 'aria-label': 'search' }}
                type='text'
                value={search}
                onChange={handleSearchClick}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSearchSubmit()
                }}
            />
            <StyledSearchButton
                onClick={handleSearchSubmit}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSearchSubmit()
                }}
            >
                Search
            </StyledSearchButton>
        </Box>
    )
}

export default SearchBox