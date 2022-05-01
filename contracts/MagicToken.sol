// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/presets/ERC721PresetMinterPauserAutoId.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract MagicToken is ERC721PresetMinterPauserAutoId, Ownable {
    uint256 public MAX_SUPPLY = 1000;
    uint256 public MINT_PRICE = 0.01 ether;

    constructor(string memory _baseURI)
        ERC721PresetMinterPauserAutoId("Magic", "MAGIC", _baseURI)
    {}

    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        payable(msg.sender).transfer(balance);
    }

    function setPaused(bool _isPaused) public onlyOwner {
        if (_isPaused) {
            Pausable._pause();
        } else {
            Pausable._unpause();
        }
    }

    function mint() public payable {
        uint256 supply = totalSupply();

        require(supply < MAX_SUPPLY, "Mint supply limit reached");
        require(msg.value >= MINT_PRICE, "Not enough ETH sent");

        _mint(msg.sender, supply);
    }
}
