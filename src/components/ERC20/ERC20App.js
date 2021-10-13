import { useState } from 'react'
import { Link, Box } from '@mui/material'
import ERC20Create from './ERC20Create'
import ERC20MainMenu from './ERC20MainMenu'
import ERC20Import from './ERC20Import'

const Menu = {
    Main: 0,
    Create: 1,
    Import: 2
}

const ERC20App = () => {
    const [menu, setMenu] = useState(Menu.Main);
    const [tokenAddress, setTokenAddress] = useState("");

    const onClickCreate = () => setMenu(Menu.Create);
    const importToken = (address) => {
        setTokenAddress(address);
        setMenu(Menu.Import);
    };

    return (
        <div>
            {menu !== Menu.Main &&
                <Box sx={{ height: "5ch" }}>
                    <Link href="#" onClick={() => setMenu(Menu.Main)} sx={{ m: 1 }}>
                        Back
                    </Link>
                </Box>
            }
            {menu === Menu.Main && <ERC20MainMenu onClickCreate={onClickCreate} importToken={importToken} />}
            {menu === Menu.Create && <ERC20Create importToken={importToken} />}
            {menu === Menu.Import && <ERC20Import tokenAddress={tokenAddress} />}
        </div>
    )
}

export default ERC20App
