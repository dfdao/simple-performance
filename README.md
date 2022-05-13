# Simple Peformance Evaluation for EVM chains

# Installation
- `git clone https://github.com/dfdao/simple-performance.git`
- `yarn`

# .env
- Make a .env file with the key DEPLOYER_MNEMONIC=<private_key>  
    - This private key should correspond to a wallet that as funds on the networks you want to test

# Usage
- If you want to use my deployed contracts, you can just start running tests

- `ITERATIONS=2 yarn hardhat --network gnosis_optimism run scripts/metrics.ts`
- `ITERATIONS=2 yarn hardhat --network kovan_optimism run scripts/metrics.ts`
- `ITERATIONS=2 yarn hardhat --network xdai run scripts/metrics.ts`

(in progress) - `ITERATIONS=2 yarn hardhat --network optimism_dev run scripts/metrics.ts`