// CustomNode.js
import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import ClickAwayListener from '@mui/material/ClickAwayListener';

const CustomNode = (props) => {
    const { label, link, definition } = props.node.data;
    const [open, setOpen] = useState(false);

    const handleTooltipOpen = (event) => {
        event.stopPropagation();
        setOpen(true);
    };

    const handleTooltipClose = () => {
        setOpen(false);
    };

    const handleNodeClick = () => {
        window.open(link, '_blank');
    };

    // const isLeafNode = nodes.filter((n) => n.source === node.id).length === 0;

    return (
        <ClickAwayListener onClickAway={handleTooltipClose}>
            <Tooltip
                title={definition}
                arrow
                open={open}
                onClose={handleTooltipClose}
                onOpen={handleTooltipOpen}
            >
                <Box
                    sx={{
                        padding: '10px',
                        border: '1px solid #777',
                        borderRadius: '5px',
                        backgroundColor: 'white',
                        cursor: 'pointer',
                        position: 'relative',
                        // width: { xs: '100px', sm: '150px', md: '200px' },  // Responsive width
                        // height: { xs: '50px', sm: '70px', md: '90px' },   // Responsive height
                    }}
                    onClick={handleNodeClick}
                >
                    {label}
                    <IconButton
                        sx={{
                            position: 'absolute',
                            top: '-10px',
                            right: '-10px',
                            zIndex: 1,
                            backgroundColor: 'white',
                            display: { xs: 'block', sm: 'none' },
                        }}
                        size="small"
                        onClick={handleTooltipOpen}
                    >
                        <InfoIcon fontSize="small" />
                    </IconButton>
                    <Handle type="target" position={Position.Top} />
                    {/* <Handle type="source" position={Position.Bottom} /> */}
                    {!props.isLeaf && <Handle type="source" position={Position.Bottom} />}
                </Box>
            </Tooltip>
        </ClickAwayListener>
    );
};

export default CustomNode;
