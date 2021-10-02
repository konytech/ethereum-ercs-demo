import { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { ListItemButton } from '@mui/material';
import ERC20App from './components/ERC20/ERC20App';

const drawerWidth = 240;
const ERC = {
  ERC20: "ERC-20",
  ERC721: "ERC-721",
  ERC777: "ERC-777",
  ERC1155: "ERC-1155"
}
const allERCs = Object.values(ERC);

function App() {
  const [ERCIndex, setERCIndex] = useState(0);

  return (<>
    {window.ethereum ? (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
        >
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
              boxSizing: 'border-box',
            },
          }}
          variant="permanent"
          anchor="left"
        >
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
          sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
          <Toolbar />
          {ERCIndex === allERCs.findIndex((x) => x === ERC.ERC20) && <ERC20App />}
        </Box>
      </Box>
    ) : "Metamask or another EIP-1102 / EIP-1193 compliant wallet not found"}
  </>);
}

export default App;
