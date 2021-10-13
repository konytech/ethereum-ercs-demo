import { useState } from 'react'
import { Typography, Button, TextField, Grid, CircularProgress, Alert } from '@mui/material'

const ERC20Token = require("./ERC20Token");
const { applyDecimals, web3 } = require('../../utils/ethereumAPI');
const web3Token = new web3.eth.Contract(ERC20Token.abi);

const ERC20Create = ({ importToken }) => {
    const defaultDecimals = "18";
    const defaultInitialSupply = "1000000000000000000"; // 1
    const [tokenName, setTokenName] = useState("");
    const [tokenSymbol, setTokenSymbol] = useState("");
    const [tokenInitialSupply, setTokenInitialSupply] = useState(defaultInitialSupply);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const onClickAction = async () => {
        if(successMessage) {
            importToken(web3Token.options.address);
            return;
        }

        setLoading(true);
        setErrorMessage("");
        setSuccessMessage("");

        const accounts = await web3.eth.getAccounts();
        try {
            const result = await web3Token
                            .deploy({
                                data: ERC20Token.bytecode,
                                arguments: [tokenName, tokenSymbol, tokenInitialSupply]
                            })
                            .send({ from: accounts[0] });

            web3Token.options.address = result._address;
            setSuccessMessage(`Token successfully deployed at: ${result._address}`);
        } catch (error) {
            setErrorMessage(error.message);
        }

        setLoading(false);
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h6" noWrap component="div" sx={{ m: 1 }}>
                    Create token
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Name"
                    sx={{ m: 1, width: '25ch' }}
                    placeholder="GOLD"
                    onChange={(e) => setTokenName(e.target.value)} />
                <TextField
                    label="Symbol"
                    sx={{ m: 1, width: '25ch' }}
                    placeholder="GLD"
                    onChange={(e) => setTokenSymbol(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Initial supply (raw)"
                    sx={{ m: 1, width: '30ch' }}
                    placeholder={defaultInitialSupply}
                    type="number"
                    value={tokenInitialSupply}
                    onChange={(e) => setTokenInitialSupply(e.target.value)}
                />
                <TextField
                    label="Initial supply (adjusted)"
                    sx={{ m: 1, width: '30ch' }}
                    placeholder="1"
                    value={applyDecimals(tokenInitialSupply, defaultDecimals)}
                    variant="filled"
                />
                <TextField
                    label="Decimals"
                    sx={{ m: 1, width: '10ch' }}
                    value={defaultDecimals}
                    type="number"
                    variant="filled"
                />
            </Grid>
            <Grid item xs={12}>
                {successMessage && <Alert severity="success">{successMessage}</Alert>}
                {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
                <Button
                    variant="contained"
                    sx={{ m: 1 }}
                    onClick={() => onClickAction()}
                    disabled={loading}
                >
                    {successMessage ? "Token info" : (loading ? <CircularProgress size={25} /> : "Create")}
                </Button>
            </Grid>
        </Grid>
    )
}

export default ERC20Create
