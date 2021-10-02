import React from 'react'
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';
import { InputAdornment } from '@mui/material';
import { LabelImportantRounded } from '@mui/icons-material';
import { useState } from 'react';
import ERC20MainMenu from './ERC20MainMenu';
import ERC20Create from './ERC20Create';

const Menu = {
  Default: 0,
  Create: 1
}

const ERC20App = () => {
  const [menu, setMenu] = useState(Menu.Default);

  const onClickCreate = () => setMenu(Menu.Create);

  return (
    <>
      {menu === Menu.Default && <ERC20MainMenu onClickCreate={onClickCreate} />}
      {menu === Menu.Create && <ERC20Create/>}
    </>
  )
}

export default ERC20App
