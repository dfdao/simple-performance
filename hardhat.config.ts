import "@nomiclabs/hardhat-waffle";
import '@typechain/hardhat'
import { extendEnvironment, task } from "hardhat/config";
import { HardhatUserConfig } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import * as settings from './settings';

import './tasks/game'

require('dotenv').config();

const { DEPLOYER_MNEMONIC } = process.env;

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html

extendEnvironment((env: HardhatRuntimeEnvironment) => {
  env.DEPLOYER_MNEMONIC = DEPLOYER_MNEMONIC;
  // cant easily lookup deployer.address here so well have to be ok with undefined and check it later
});

// The xdai config, but it isn't added to networks unless we have a DEPLOYER_MNEMONIC
const xdai = {
  url: process.env.XDAI_RPC_URL ?? 'https://rpc-df.xdaichain.com/',
  accounts: {
    mnemonic: DEPLOYER_MNEMONIC,
  },
  chainId: 100,
  gasMultiplier: 5,
};

const xdai_ws = {
  url: process.env.XDAI_RPC_URL ?? 'wss://rpc.gnosischain.com/wss',
  accounts: {
    mnemonic: DEPLOYER_MNEMONIC,
  },
  chainId: 100,
  gasMultiplier: 5,
};


const kovan_optimism = {
  url: 'https://kovan.optimism.io',
  accounts: {
    mnemonic: DEPLOYER_MNEMONIC,
  },
  chainId: 69,
  gasLimit: 15000000,
  gasMultiplier: 5,
};

const kovan_optimism_ws = {
  url: 'wss://ws-mainnet.optimism.io',
  accounts: {
    mnemonic: DEPLOYER_MNEMONIC,
  },
  chainId: 69,
  gasLimit: 15000000,
  gasMultiplier: 5,
};

const gnosis_optimism = {
  url: 'https://optimism.gnosischain.com',
  accounts: {
    mnemonic: DEPLOYER_MNEMONIC,
  },
  chainId: 300,
  gasLimit: 15000000,
  gasMultiplier: 5,
};

const gnosis_optimism_ws = {
  url: 'wss://optimism.gnosischain.com/wss',
  accounts: {
    mnemonic: DEPLOYER_MNEMONIC,
  },
  chainId: 300,
  gasLimit: 15000000,
  gasMultiplier: 5,
};

const config: HardhatUserConfig = {
  // Your type-safe config goes here
  solidity: "0.8.4",
  typechain: {
    outDir: 'types',
    target: 'ethers-v5',
  },
  defaultNetwork: 'hardhat',
  networks: {
    // Check for a DEPLOYER_MNEMONIC before we add xdai/mainnet network to the list of networks
    // Ex: If you try to deploy to xdai without DEPLOYER_MNEMONIC, you'll see this error:
    // > Error HH100: Network xdai doesn't exist
    ...(DEPLOYER_MNEMONIC ? { gnosis_optimism } : undefined),
    ...(DEPLOYER_MNEMONIC ? { kovan_optimism } : undefined),
    ...(DEPLOYER_MNEMONIC ? { gnosis_optimism_ws } : undefined),
    ...(DEPLOYER_MNEMONIC ? { kovan_optimism_ws } : undefined),
    ...(DEPLOYER_MNEMONIC ? { xdai } : undefined),
    ...(DEPLOYER_MNEMONIC ? { xdai_ws } : undefined),
  }
};


export default config;