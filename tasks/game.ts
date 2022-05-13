import { task, types } from "hardhat/config";
import type { HardhatRuntimeEnvironment } from "hardhat/types";
import { Game } from "../types";
import * as fs from "fs";
import * as path from "path";

import DEPLOYED_CONTRACTS from "../deploys/deploy.json";
import { ContractTransaction } from "ethers";
const DEPLOY_PATH = path.join("./deploys", "deploy.json");


// Wait for tx to confirm and log time between submit and confirm
async function waitWithMetrics(tx: ContractTransaction, hre: HardhatRuntimeEnvironment, name?: string): Promise<number> {
    var startTime = performance.now()
    const receipt = await tx.wait();
    var endTime = performance.now()
    console.log(`${name} confirmed ${endTime - startTime} milliseconds`)
    console.log(`confirmed with ${receipt.confirmations} blocks, ${receipt.gasUsed} gas used and ${tx.gasPrice} price (wei)`);  
    // @ts-expect-error
    console.log('url', hre.network.config.url);
    return endTime - startTime;
}

task("game:deploy", "deploy Game contract").setAction(deploy);

async function deploy(args: any, hre: HardhatRuntimeEnvironment) {
  const factory = await hre.ethers.getContractFactory("Game");
  const game = (await factory.deploy()) as Game;
  await game.deployed();

  console.log(`Game deployed to: ${game.address} on ${hre.network.name}`);

  let deploys: any = { ...DEPLOYED_CONTRACTS };
  deploys[hre.network.name] = game.address;

  fs.writeFileSync(DEPLOY_PATH, JSON.stringify(deploys));
  console.log("saved address in", DEPLOY_PATH);
}

task(
  "game:increment",
  "measure time for a simple contract interaction"
).setAction(increment);

async function increment(args: any, hre: HardhatRuntimeEnvironment) {
  // @ts-expect-error
  const address = DEPLOYED_CONTRACTS[hre.network.name] as string;
  if(!hre.ethers.utils.isAddress(address)) {
    throw new Error('Address is not valid. Make sure you have deployed on this network');
  }
 const game = await hre.ethers.getContractAt('Game', address); 
 const incrementTx = await game.incrementScore();
 await waitWithMetrics(incrementTx, hre, 'incrementScore');

 console.log('chain id', (await hre.ethers.provider.getNetwork()))
 hre.ethers.provider 
}

task(
  "game:increment:allRpc",
  "measure time for a simple contract interaction"
).setAction(incrementAllRpc);

async function incrementAllRpc(args: any, hre: HardhatRuntimeEnvironment) {
  // @ts-expect-error
  const address = DEPLOYED_CONTRACTS[hre.network.name] as string;
  if(!hre.ethers.utils.isAddress(address)) {
    throw new Error(`Address is not valid. Make sure you have deployed on network ${hre.network.name}`);
  }
 const game = await hre.ethers.getContractAt('Game', address); 
//  const incrementTx = await game.incrementScore();
//  await waitWithMetrics(incrementTx, hre, 'incrementScore');

 console.log('chain id', (await hre.ethers.getDefaultProvider().getNetwork()).chainId)
}
