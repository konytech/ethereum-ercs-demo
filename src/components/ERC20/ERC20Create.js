import React from 'react'
import { useState } from 'react';
import { Typography, Button, TextField, Grid, CircularProgress } from '@mui/material';

const ERC20Token = require("./ERC20Token");
const { web3 } = require('../ethereumAPI')
const web3Token = new web3.eth.Contract(ERC20Token.abi);

const ERC20Create = () => {
    const [loading, setLoading] = useState(false);

    const onClick = async () => {
        setLoading(true);

        const accounts = await web3.eth.getAccounts();
        console.log(accounts);
        await web3Token.deploy({ data: ERC20Token.bytecode, arguments: ["GOLD", "GLD", 10000] })
                        .send({ from: accounts[0] });

    };

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h6" noWrap component="div" sx={{ m: 1 }}>
                        Create token
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Name"
                        id="outlined-start-adornment"
                        sx={{ m: 1, width: '25ch' }}
                        placeholder="GOLD"
                    />
                    <TextField
                        label="Symbol"
                        id="outlined-start-adornment"
                        sx={{ m: 1, width: '25ch' }}
                        placeholder="GLD"
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        sx={{ m: 1 }}
                        onClick={() => onClick()}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={25} /> : "Create"}
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}

export default ERC20Create
