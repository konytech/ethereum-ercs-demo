import React from 'react'
import { useState } from 'react';
import ERC20MainMenu from './ERC20MainMenu';
import ERC20Create from './ERC20Create';
import ERC20Import from './ERC20Import';
import { Link, Box } from '@mui/material';

const Menu = {
  Default: 0,
  Create: 1,
  Import: 2
}

const ERC20App = () => {
  const [menu, setMenu] = useState(Menu.Default);
  const [tokenAddress, setTokenAddress] = useState("");

  const onClickCreate = () => setMenu(Menu.Create);
  const importToken = (address) => {
    setTokenAddress(address);
    setMenu(Menu.Import)
  };

  return (
    <>
      {menu !== Menu.Default &&
        <Box sx={{ height: "5ch"}}>
          <Link href="#" onClick={() => setMenu(Menu.Default)} sx={{ m: 1 }}>Back</Link>
        </Box>
      }
      {menu === Menu.Default && <ERC20MainMenu onClickCreate={onClickCreate} importToken={importToken} />}
      {menu === Menu.Create && <ERC20Create importToken={importToken} />}
      {menu === Menu.Import && <ERC20Import tokenAddress={tokenAddress} />}
    </>
  )
}

export default ERC20App
