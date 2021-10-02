// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./openzeppelin/token/ERC20/ERC20.sol";

contract TokenERC20 is ERC20 {
    constructor(string memory name, string memory symbol, uint256 initialSupply, uint256 decimals) ERC20(name, symbol, decimals) {
        _mint(msg.sender, initialSupply);
    }
}