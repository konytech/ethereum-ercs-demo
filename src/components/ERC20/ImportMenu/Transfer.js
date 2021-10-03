import React from 'react'
import { useState } from 'react';
import { Grid, TextField, Button, Alert, CircularProgress } from '@mui/material';

const { web3, applyDecimals } = require('../../../utils/ethereumAPI')

const Transfer = ({ web3Token, refreshOverview, tokenData }) => {
    const symbol = tokenData.find(x => x.name === "Symbol").value;
    const decimals = tokenData.find(x => x.name === "Decimals").value;

    const [data, setData] = useState({ arg1: '', arg2: '', errorMessage: '', successMessage: '', loading: false });

    const onClickTransfer = async () => {

        setData({ ...data, loading: true });

        let errorMessage = "";
        let successMessage = "";
        try {
            const accounts = await web3.eth.getAccounts();
            const amountToSend = applyDecimals(data.arg2, decimals, "positive");
            await web3Token.methods.transfer(data.arg1, amountToSend).send({ from: accounts[0] });
            successMessage = `Transfer successful. Amount sent: ${data.arg2} ${symbol}`;
            
            // Refresh the token overview to update the wallet balance
            refreshOverview();
        } catch (error) {
            errorMessage = error.message;
        }

        setData({ ...data, loading: false, errorMessage, successMessage });
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                    sx={{ m: 1, width: '50ch' }}
                    size="small"
                    placeholder="0x0000000000000000000000000000000000000000"
                    onChange={(e) => setData({ ...data, arg1: e.target.value, errorMessage: '', successMessage: '' })}
                />
                <TextField
                    sx={{ m: 1, width: '30ch' }}
                    size="small"
                    placeholder="1"
                    onChange={(e) => setData({ ...data, arg2: e.target.value, errorMessage: '', successMessage: '' })}
                />
                <Button
                    variant="contained"
                    sx={{ m: 1 }}
                    onClick={(e) => onClickTransfer()}
                    disabled={data.loading}
                >
                    {data.loading ? <CircularProgress size={25} /> : "transfer(address to, uint256 value)"}
                </Button>
            </Grid>
            <Grid item xs={12}>
                {data.errorMessage && <Alert severity="error" onClose={() => setData({ ...data, errorMessage: "" })}>{data.errorMessage}</Alert>}
                {data.successMessage && <Alert severity="success" onClose={() => setData({ ...data, successMessage: "" })}>{data.successMessage}</Alert>}
            </Grid>
        </Grid>
    )
}

export default Transfer
