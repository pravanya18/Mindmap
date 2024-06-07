import { Box, Typography } from '@mui/material'
import React from 'react'
import SearchBox from '../searchBox/SearchBox'
import Divider from "@mui/material/Divider";

const Header = ({ searchValue, setSearchValue, setLoading, setTreeData }) => {
    return (
        <>
        <Box sx={{
             position: 'fixed', display: 'flex',
             justifyContent: 'center',
             gap:'2px',
            alignItems: 'center',
            width:'100%',
            height: '10vh', 
            zIndex: 500, background: '#b3b3f4',
        }}>
            <Box sx={{ mx: 1 }}>
                <Typography variant='h5' color="black" style={{ marginLeft: '16px' }}>
                    MindMap
                </Typography>
            </Box>
            <Box sx={{ mx: 10 }}>
                <SearchBox style={{ marginLeftt: '16px', width:'900px' }}
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    setLoading={setLoading}
                    setTreeData={setTreeData}
                />
            </Box>

        </Box>
         <Box sx={{
            position: 'fixed', display: 'flex',
            top:'50px',
            justifyContent: 'center',
            gap:'40px',
           alignItems: 'center',
           width:'100%',
           height: '7vh', 
           zIndex: 500, background: '#b3b3f4',
       }}>
               <Typography variant='h7' color="black" style={{ marginLeft: '16px' }}>
                   Example Searches:
                   <Divider style={{"border-color":"#1d8b69"}}/>
               </Typography>
               <Typography variant='h7' color="black" style={{ marginLeft: '16px' }}>
               how to begin learning network security
               <Divider style={{"border-color":"#1d8b69"}}/>
               </Typography>
               <Typography variant='h7' color="black" style={{ marginLeft: '16px' }}>
               how to become a certified react developer
               <Divider style={{"border-color":"#1d8b69"}}/>
               </Typography>
               <Typography variant='h7' color="black" style={{ marginLeft: '16px' }}>
               efficient ways to product marketing
               <Divider style={{"border-color":"#1d8b69"}}/>
               </Typography>
           </Box>
        </>
    )
}

export default Header