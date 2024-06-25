import React, { useState } from 'react'
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import {Box, Typography, Button, Divider} from "@mui/material"

const Search = styled('div')(({ theme }) => ({
    position:{xs: 'fixed', md:  'relative'},
    borderRadius: theme.shape.borderRadius,
    // backgroundColor: alpha(theme.palette.common.white, 0.15),
    // '&:hover': {
    //     backgroundColor: alpha(theme.palette.common.white, 0.25),
    // },
    [theme.breakpoints.up('xs')]: {
        // marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

// const SearchIconWrapper = styled('div')(({ theme }) => ({
//     padding: theme.spacing(0, 2),
//     height: '100%',
//     position: 'absolute',
//     pointerEvents: 'none',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     color: 'white',
//     borderWidth: "2px",
//     borderColor:"red",
//     borderStyle: "solid",
//     backgroundColor: alpha(theme.palette.common.white, 0.15),
//     borderRadius: "2px",
//     right:"-130px",
//     top: "0px"
// }));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(0)})`,
        transition: theme.transitions.create('width'),
         width: '30ch',
        color: 'black',
        
        "border-bottom-width": 'thin',
        "border-bottom-style": "solid",
       
    },
    [theme.breakpoints.down('md')]: {
        left: "50%",
         marginLeft: "-150px",
         marginTop: "10px"
        
    },
}));

const StyledSearchButton = styled(InputBase)(({ theme }) => ({
    color: 'red',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(0)})`,
        transition: theme.transitions.create('width'),
        width: '60px',
        color: 'white',
        cursor:'pointer'
    },
   
    padding: {md: "0px"},
    height: "30px",
    borderColor: "#17664e",
    borderWidth: "2px",
    borderStyle: "solid",
    borderRadius: "40px",
    "background-color": "#4c8087",
    "font-size": "12px",
    marginBottom: "5px",
    marginLeft: "10px",
    marginRight: "auto",
    marginTop: "10px",
    [theme.breakpoints.down('md')]: {
         left: "50%",
         marginLeft: "-60px",
         top: "100px",
         position:"fixed"
            
        },


}));

const SearchBox = ({ setSearchValue, setLoading, setTreeData }) => {

    // const [search, setSearch] = useState("")

    // const fetchData = async (word) => {
    //     setLoading(true)
    //     try {
    //         console.log("word12 "+word);
    //       //  const response = await axios.get(`${process.env.REACT_APP_server_url}data/${word}`)
    //        const response = await axios.post(`https://us-central1-neethu-ml.cloudfunctions.net/mind-map-2`, {keyword: word})
    //        .then((response) => {console.log("responseeeeeee...." + JSON.stringify(response));
    //        // JSON.stringify(response.data).replaceAll("title","name").replaceAll("subtopics","children")
    //        setTreeData(response)}).catch(x => {
    //         alert("alert "+ x);
    //        })
    //        console.log("Done... ")
    //    //     console.log(`${process.env.REACT_APP_server_url}data/${word}`);
    //         // if (response) {
    //         //     console.log(" response "+ JSON.stringify(response.data));
    //         //     setTreeData(response.data)
    //         // }
    //     } catch (e) {
    //         if (e.response?.status === 404) {
    //             setTreeData(null)
    //         }

    //         console.log(e)
    //     }
    //     setLoading(false)
    // }

    const [search, setSearch] = useState("")

    const fetchData = async (word) => {
        setLoading(true)
        try {
            console.log("word12 "+word);
          //  const response = await axios.get(`${process.env.REACT_APP_server_url}data/${word}`)
           const response = await axios.post(`https://us-central1-neethu-ml.cloudfunctions.net/mind-map-2`, {keyword: word})
           .then((response) => {console.log("responseeeeeee...." + JSON.stringify(response));
           // JSON.stringify(response.data).replaceAll("title","name").replaceAll("subtopics","children")
           setTreeData(response.data)}).catch(x => {
            alert("alert "+ x);
           })
           console.log("Done... ")
       //     console.log(`${process.env.REACT_APP_server_url}data/${word}`);
            // if (response) {
            //     console.log(" response "+ JSON.stringify(response.data));
            //     setTreeData(response.data)
            // }
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
    }

    const handleSearchSubmit = async (e) => {
        setSearchValue(search)
        console.log(search)
        fetchData(search.toLowerCase());
    }

    return (
        <Search>
            <StyledInputBase
                placeholder="enter a topic to generate a mindmap for"
                inputProps={{ 'aria-label': 'search' }}
                type='text'
                value={search}
                onChange={handleSearchClick}
                // onKeyDown={(e) => {
                //     if (e.key === 'Enter') handleSearchSubmit()
                // }}
                // onClick={handleSearchSubmit}
            />

            <StyledSearchButton 
            placeholder='Search...1'
            inputProps={{"aria-label": "search"}}
            type='text'
            value={"SEARCH"}
            onClick={handleSearchSubmit}
            onKeyDown={(e) => {
                if (e.key === 'Enter') handleSearchSubmit()
            }}
            />
            {/* <Divider style={{"border-color": "black"}} /> */}
        </Search>
    )
}

export default SearchBox