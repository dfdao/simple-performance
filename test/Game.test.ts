import { expect } from 'chai';
import { ethers } from 'hardhat';
import { Game } from '../types'

describe("Game", function () {
  it("Should increment score", async function () {
    const factory = await ethers.getContractFactory('Game');
    const game = await factory.deploy() as Game;
    await game.deployed();
    console.log(`Game deployed to: ${game.address}`);

    expect(await game.score()).to.equal(0);

    const incrementTx = await game.incrementScore();

    // wait until the transaction is mined
    await incrementTx.wait();

    expect(await game.score()).to.equal(1);
  });
});