import { Box, Collapse, Grid, Typography } from '@mui/material'
import { IconButton } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import React from 'react'

const ExampleSection = () => {
    const [collapsed, setCollapsed] = React.useState(true);
    const handleCollapse = () => setCollapsed(!collapsed)

    return (
        <>
            <Box onClick={handleCollapse}>
                <Typography variant='body1' sx={{ px: 1, whiteSpace: 'pre-wrap' }}>{collapsed ? 'Show examples' : 'Hide examples'}
                    <IconButton >
                        {collapsed ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                </Typography>
            </Box>
            <Collapse in={!collapsed}>
                <Grid container spacing={1} sx={{ px: 1 }}>
                    <Grid item xs={12} sm={6} md={4} lg={3}>Search Query 1 Search Query 1</Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>Search Query 1 Search Query 1</Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>Search Query 1 Search Query 1</Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>Search Query 1 Search Query 1</Grid>
                </Grid>
            </Collapse>
        </>
    )
}

export default ExampleSection