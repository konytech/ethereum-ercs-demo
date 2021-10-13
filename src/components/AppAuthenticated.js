import { useState } from 'react';
import ERC20App from './ERC20/ERC20App';
import { CssBaseline, Divider, Drawer, List, ListItemButton,
    ListItemText, Typography, AppBar, Toolbar, Box } from '@mui/material';

const AppAuthenticated = () => {
    const [ERCIndex, setERCIndex] = useState(0);
    const ERC = {
        ERC20: "ERC-20",

        //ERCs below are not yet implemented
        //ERC721: "ERC-721",
        //ERC777: "ERC-777",
        //ERC1155: "ERC-1155"
    }
    const allERCs = Object.values(ERC);
    const drawerWidth = 240;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        Ethereum ERCs demo
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box'
                    }
                }}
                variant="permanent"
                anchor="left">
                <Toolbar />
                <Divider />
                <List>
                    {allERCs.map((erc, index) => {
                        return (<ListItemButton
                            key={index}
                            selected={index === ERCIndex}
                            onClick={() => setERCIndex(index)}
                        >
                            <ListItemText primary={erc} />
                        </ListItemButton>
                        );
                    })}
                </List>
            </Drawer>
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p:3 }}>
                    <Toolbar />
                {ERCIndex === allERCs.findIndex((x) => x === ERC.ERC20) && <ERC20App />}
            </Box>
        </Box>
    )
}

export default AppAuthenticated
