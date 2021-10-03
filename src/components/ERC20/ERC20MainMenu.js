import React from 'react'
import { useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';

const rinkebyWETHAdress = "0xc778417e063141139fce010982780140aa0cd5ab";

const ERC20MainMenu = ({ onClickCreate, importToken }) => {
    const [tokenAddress, setTokenAddress] = useState(rinkebyWETHAdress);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Button
                    variant="contained"
                    sx={{ m: 1 }}
                    onClick={() => onClickCreate()} >Create token</Button>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Token address"
                    sx={{ m: 1, width: '50ch' }}
                    placeholder="0x"
                    size="small"
                    value={tokenAddress}
                    onChange={(e) => setTokenAddress(e.target.value)}
                />
                <Button
                    variant="contained"
                    sx={{ m: 1 }} 
                    onClick={() => importToken(tokenAddress)}>Import token</Button>
            </Grid>
        </Grid>
    )
}

export default ERC20MainMenu
