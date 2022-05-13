import DEPLOYED_CONTRACTS from "../deploys/deploy.json";
import { ContractTransaction } from "ethers";
import path from "path";
import * as hre from "hardhat";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const DEPLOY_PATH = path.join("./deploys", "deploy.json");

const DEFAULT_ITERATIONS = 1;

// Wait for tx to confirm and log time between submit and confirm
async function waitWithMetrics(
  tx: ContractTransaction,
  hre: HardhatRuntimeEnvironment,
  name?: string
): Promise<number> {
  var startTime = performance.now();
  const receipt = await tx.wait();
  var endTime = performance.now();
  console.log(
    `confirmed with ${receipt.confirmations} blocks, ${receipt.gasUsed} gas used and ${tx.gasPrice} price (wei)`
  );
  return endTime - startTime;
}

async function loadConnection() {}

async function testTx(iterations: number) {
  // @ts-expect-error
  const address = DEPLOYED_CONTRACTS[hre.network.name] as string;
  if (!hre.ethers.utils.isAddress(address)) {
    throw new Error(
      "Address is not valid. Make sure you have deployed on this network"
    );
  }
  const game = await hre.ethers.getContractAt("Game", address);
  let totalTime = 0;
  for (let i = 0; i < iterations; i++) {
    const incrementTx = await game.incrementScore();
    totalTime += await waitWithMetrics(incrementTx, hre, "incrementScore");
  }
  // @ts-expect-error
  const url = hre.network.config.url;
  const avgTime = (totalTime/iterations).toFixed(3);
  console.log(`Made ${iterations} txs on ${url} on avg in ${avgTime} ms`);
}

async function main() {
  const iterations = process.env.ITERATIONS ?  parseInt(process.env.ITERATIONS) : DEFAULT_ITERATIONS;

  await testTx(iterations);
}

main().catch(console.log);


