import { useState } from 'react';
import { Grid, TextField, Button, Alert, Typography } from '@mui/material';

const { applyDecimals } = require('../../../utils/ethereumAPI')

const Allowance = ({ web3Token, tokenData }) => {
    const decimals = tokenData.find(x => x.name === "Decimals").value;
    const [data, setData] = useState({ arg1: '', arg2: '', errorMessage: '', loading: false });

    const onClickAllowance = async () => {
        let rawBalance = '';
        try {
            rawBalance = await web3Token.methods.allowance(data.arg1, data.arg2).call();
        } catch (error) {
            setData({ ...data, errorMessage: error.message });
            return;
        }
        const adjustedBalance = applyDecimals(rawBalance, decimals);
        setData({ ...data, result: adjustedBalance });
    };

    return (
        <Grid container>
            <Grid item xs={12}>
                <Button
                    variant="contained"
                    sx={{ m: 1 }}
                    onClick={(e) => onClickAllowance()}
                    disabled={data.loading}
                >
                    allowance(address owner, address spender)
                </Button>
                <Typography variant="subtitle1" noWrap display="inline" component="div" sx={{ m: 1 }}>
                    Result:
                </Typography>
                <TextField
                    sx={{ m: 1, width: '30ch' }}
                    size="large"
                    value={data.result}
                    InputLabelProps={{ shrink: true }}
                    variant="standard"
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Owner"
                    sx={{ m: 1, width: '50ch' }}
                    size="small"
                    placeholder="0x0000000000000000000000000000000000000000"
                    onChange={(e) => setData({ ...data, arg1: e.target.value, errorMessage: '' })}
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    label="Spender"
                    sx={{ m: 1, width: '50ch' }}
                    size="small"
                    placeholder="0x0000000000000000000000000000000000000000"
                    onChange={(e) => setData({ ...data, arg2: e.target.value, errorMessage: '' })}
                    InputLabelProps={{ shrink: true }}
                />
            </Grid>
            <Grid item xs={12}>
                {data.errorMessage && <Alert severity="error" onClose={() => setData({ ...data, errorMessage: "" })}>{data.errorMessage}</Alert>}
            </Grid>
        </Grid >
    )
}

export default Allowance
