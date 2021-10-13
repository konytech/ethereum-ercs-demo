import { useState, useEffect } from 'react'
import { Grid, Typography, Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import BalanceOf from './ImportMenu/BalanceOf';
import Transfer from './ImportMenu/Transfer';
import TransferFrom from './ImportMenu/TransferFrom';
import Approve from './ImportMenu/Approve';
import Allowance from './ImportMenu/Allowance';

const ERC20Token = require("./ERC20Token");
const { web3, applyDecimals } = require("../../utils/ethereumAPI");

const ERC20Import = ({ tokenAddress }) => {
    const web3Token = new web3.eth.Contract(ERC20Token.abi, tokenAddress);
    const [tokenRefresh, setTokenRefresh] = useState(0);
    const [tokenData, setTokenData] = useState([
        { id: 0, name: 'Address', value: tokenAddress },
        { id: 1, name: 'Name', value: '' },
        { id: 2, name: 'Symbol', value: '' },
        { id: 3, name: 'TotalSupply', value: '' },
        { id: 4, name: 'Decimals', value: '' },
        { id: 5, name: 'Current balance', value: '' }
    ]);

    const columns = [
        { field: 'name', headerName: 'Token', width: 150 },
        { field: 'value', headerName: 'Value', width: 500 }
    ];

    useEffect(() => {
        async function fetchData() {
            const web3Token = new web3.eth.Contract(ERC20Token.abi, tokenAddress);
            const name = await web3Token.methods.name().call();
            const symbol = await web3Token.methods.symbol().call();
            const totalSupply = await web3Token.methods.totalSupply().call();
            const decimals = await web3Token.methods.decimals().call();

            const accounts = await web3.eth.getAccounts();
            const currentBalance = await web3Token.methods.balanceOf(accounts[0]).call();
            
            setTokenData(tokenData => [
                tokenData[0],
                { ...tokenData[1], value: name },
                { ...tokenData[2], value: symbol },
                { ...tokenData[3], value: applyDecimals(totalSupply, decimals) },
                { ...tokenData[4], value: decimals },
                { ...tokenData[5], value: applyDecimals(currentBalance, decimals) }
            ]);
        }
        fetchData();
    }, [tokenAddress, tokenRefresh]);

    const refreshDataGrid = () => setTokenRefresh(t => ++t);

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h6" noWrap component="div" sx={{ m: 1 }}>
                        Token info
                    </Typography>
                </Grid>
                <Grid item xs={12} sx={{ height: '450px' }}>
                    <DataGrid rows={tokenData} columns={columns} />
                </Grid>
            </Grid>
            <Box border={1} sx={{ mt: 2, borderRadius: 1, borderColor: "LightGray" }}>
                <BalanceOf web3Token={web3Token} tokenData={tokenData} />
            </Box>
            <Box border={1} sx={{ mt: 2, borderRadius: 1, borderColor: "LightGray" }}>
                <Allowance web3Token={web3Token} tokenData={tokenData} />
            </Box>
            <Box border={1} sx={{ mt: 2, borderRadius: 1, borderColor: "LightGray" }}>
                <Transfer web3Token={web3Token} tokenData={tokenData} refreshDataGrid={refreshDataGrid}/>
            </Box>
            <Box border={1} sx={{ mt: 2, borderRadius: 1, borderColor: "LightGray" }}>
                <TransferFrom web3Token={web3Token} refreshDataGrid={refreshDataGrid} tokenData={tokenData} />
            </Box>
            <Box border={1} sx={{ mt: 2, borderRadius: 1, borderColor: "LightGray" }}>
                <Approve web3Token={web3Token} refreshDataGrid={refreshDataGrid} tokenData={tokenData} />
            </Box>
        </div>
    )
}

export default ERC20Import
