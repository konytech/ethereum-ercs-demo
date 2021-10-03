import React from 'react'
import { useState } from 'react';
import { Grid, TextField, Button, Alert } from '@mui/material';

const { applyDecimals } = require('../../../utils/ethereumAPI')

const BalanceOf = ({ web3Token, tokenData }) => {
    const decimals = tokenData.find(x => x.name === "Decimals").value;
    const [data, setData] = useState({ arg1: '', errorMessage: '', result: '' });

    const onClickBalanceOf = async () => {
        let rawBalance = '';
        try {
            rawBalance = await web3Token.methods.balanceOf(data.arg1).call();
        } catch (error) {
            setData({ ...data, errorMessage: error.message });
            return;
        }
        const adjustedBalance = applyDecimals(rawBalance, decimals);
        setData({ ...data, result: adjustedBalance });
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                    sx={{ m: 1, width: '50ch' }}
                    size="small"
                    placeholder="0x0000000000000000000000000000000000000000"
                    onChange={(e) => setData({ arg1: e.target.value, result: '', errorMessage: '' })}
                />
                <Button
                    variant="contained"
                    sx={{ m: 1 }}
                    onClick={(e) => onClickBalanceOf()}
                >
                    balanceOf(address owner)
                </Button>
                <TextField
                    hiddenLabel
                    variant="filled"
                    sx={{ m: 1, width: '30ch' }}
                    size="small"
                    value={data.result}
                />
            </Grid>
            <Grid item xs={12}>
                {data.errorMessage && <Alert severity="error" onClose={() => setData({ ...data, errorMessage: "" })}>{data.errorMessage}</Alert>}
            </Grid>
        </Grid>
    )
}

export default BalanceOf
