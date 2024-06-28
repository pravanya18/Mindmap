import React, { useState } from 'react'
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { Box, Typography, Button, Divider, Grid, ButtonBase } from "@mui/material"

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
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(0)})`,
        // transition: theme.transitions.create('width'),
        // width: '100%',
        flexGrow: 1,
        color: 'black',
        "border-width": 'thin',
        "border-style": "solid",
        "border-radius": "1rem",
        "font-family": "Roboto, Helvetica, Arial, sans-serif",
        "background-color": "#f0f0f0",
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

const SearchBox = ({ setSearchValue, setLoading, setTreeData, setError }) => {

    const [search, setSearch] = useState("")

    const fetchData = async (word) => {
        setLoading(true)
        try {
            console.log("word12 " + word);
            //  const response = await axios.get(`${process.env.REACT_APP_server_url}data/${word}`)
            const response = await axios.post(`https://us-central1-neethu-ml.cloudfunctions.net/mind-map-2`, { keyword: word })
            console.log(response);
            setTreeData(response.data)
            console.log("Done... ")
        } catch (e) {
            if (e.response?.status === 404) {
                setTreeData(null)
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