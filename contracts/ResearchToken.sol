// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ResearchToken is ERC721, Ownable {
    constructor() ERC721("Research Access Token", "RAT") Ownable(msg.sender) {
        _mint(msg.sender, 1000 * 10 ** decimals());
    }

    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
}
