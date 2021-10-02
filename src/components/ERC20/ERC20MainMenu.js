import React from 'react'
import { ButtonGroup, Button } from '@mui/material';

const ERC20MainMenu = ({ onClickCreate }) => {
    return (
        <div>
            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <Button onClick={() => onClickCreate()} >Create token</Button>
                <Button>Import token</Button>
            </ButtonGroup>
        </div>
    )
}

export default ERC20MainMenu
