// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.4;


contract Game {

    uint256 public score;

    function getScore() public view returns (uint256) {
        return score;
    }


    function incrementScore() public {
        score += 1;
    }

}