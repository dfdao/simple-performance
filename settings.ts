// HRE stuff
import 'hardhat/types/runtime';


declare module 'hardhat/types/runtime' {
  interface HardhatRuntimeEnvironment {
    DEPLOYER_MNEMONIC: string | undefined;
    ADMIN_PUBLIC_ADDRESS: string | undefined;
  }
}
