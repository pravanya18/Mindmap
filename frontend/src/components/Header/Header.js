import { Box, Button, Typography, img, AppBar, Toolbar, IconButton, Grid } from '@mui/material'
import React from 'react'
import SearchBox from '../searchBox/SearchBox'
import Divider from "@mui/material/Divider";
import ExampleSection from '../ExampleSection';


const Header = ({ searchValue, setSearchValue, setLoading, setTreeData, setError }) => {
    return (
        <>
            <Box sx={{ flexGrow: 1, }}>
                <AppBar position="static" sx={{ bgcolor: 'rgb(102, 110, 116)' }}>
                    <Toolbar>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                            <Typography variant="h6" component="div" sx={{}}>
                                MindBloom
                            </Typography>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '95%',
                m: 'auto',
                py: 3,
                mt: { xs: 2, sm: 3 },
                background: 'linear-gradient(to bottom right, #b3b3f4, #e0ccff);',
                borderRadius: "1rem"
            }}>
                <Typography variant="h5" component="div" sx={{ fontWeight: 500, mb: 3 }}>AI-Powered Mind Mapping</Typography>
                <Box sx={{}}>
                    <SearchBox
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                        setLoading={setLoading}
                        setTreeData={setTreeData}
                        setError={setError}
                    />
                </Box>
            </Box>
            <ExampleSection />
            {/* <Box sx={{
             position: 'fixed',
             display: {md:'flex'},
             justifyContent: 'center',
            //  gap:'2px',
            alignItems: {md:'center'},
            width:'100%',
            height: {xs: '20vh', sm: '20vh', md: '10vh', lg: '10vh', xl: '10vh'},
            zIndex: 500, background: 'linear-gradient(to bottom right, #b3b3f4, #e0ccff);',
              borderRadius: "2px"
        }}>
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <img src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSnnxm32A0vepIZ60r9opF-csgSh3tdtH-QMOnufwS7i4zuk8bs" alt="HTML Tutorial" style={{"width":"40px", "height":"40px", "marginTop": "10px", }}></img>
                <Typography variant='h5' color="black" sx={{alignItems: {xs:'center', md:'left'}, textAlign:{xs:'center'}, marginTop: {xs:'10px', md:'10px'}, marginLeft:"30px", fontWeight: "bold" }}>
                    MindBloom
                </Typography>
            </Box>
            <Box sx={{ mx: {md:10} }}>
                <SearchBox 
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    setLoading={setLoading}
                    setTreeData={setTreeData}
                />
            </Box>

        </Box> */}
            {/* <Box sx={{
            position: 'fixed', display: 'flex',
            top:{xs:'150px', md:'50px'},
            justifyContent: 'center',
            gap:'40px',
           alignItems: 'center',
           width:'100%',
           height: {xs: '6vh', sm: '6vh', md: '6vh', lg: '7vh', xl: '7vh'}, 
           zIndex: 500, background: 'linear-gradient(to bottom right, #b3b3f4, #e0ccff);',
       }}>
               <Typography variant='h7' color="black" style={{ marginLeft: '16px' }}>
                   Examples:
                   <Divider style={{"border-color":"#1d8b69"}}/>
               </Typography>
               <Typography variant='h7' color="black" style={{ marginLeft: '16px' }}>
                OAuth
               <Divider style={{"border-color":"#1d8b69"}}/>
               </Typography>
               <Typography variant='h7' color="black" style={{ marginLeft: '16px' }}>
                React 
               <Divider style={{"border-color":"#1d8b69"}}/>
               </Typography>
              
               <Typography variant='h7' color="black" style={{ marginLeft: '16px' }}>
               product marketing
               <Divider style={{"border-color":"#1d8b69"}}/>
               </Typography>
           </Box> */}
        </>
    )
}

export default Header