// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract ResearchAccessToken is ERC721, AccessControl {
    using Counters for Counters.Counter;

    // ================== Roles ==================
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    // ================== State Variables ==================
    Counters.Counter private _tokenIdCounter;
    mapping(uint256 => string) private _tokenPurposes;

    // ================== Constructor ==================
    constructor() ERC721("ResearchAccessToken", "RAT") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
    }

    // ================== Functions ==================
    function mintResearchToken(
        address to,
        string memory researchPurpose
    ) external onlyRole(ADMIN_ROLE) returns (uint256) {
        _tokenIdCounter.increment();
        uint256 tokenId = _tokenIdCounter.current();
        _mint(to, tokenId);
        _tokenPurposes[tokenId] = researchPurpose;
        return tokenId;
    }

    function getTokenPurpose(uint256 tokenId) external view returns (string memory) {
        require(_exists(tokenId), "Token does not exist");
        return _tokenPurposes[tokenId];
    }

    function isApprovedResearcher(address researcher) external view returns (bool) {
        return balanceOf(researcher) > 0;
    }

    // Override supportsInterface to include AccessControl and ERC721
    function supportsInterface(bytes4 interfaceId) public view override(ERC721, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
