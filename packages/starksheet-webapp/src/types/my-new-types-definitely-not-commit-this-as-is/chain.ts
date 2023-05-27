// todo: remove (should be done in another PR)

export enum ChainId {
  ETHEREUM_MAINNET = 0x1,
  ETHEREUM_TESTNET = 0x5,
  ETHEREUM_DEVNET = 0x6,
  STARKNET_MAINNET = 0x534e5f4d41494e,
  STARKNET_TESTNET = 0x10,
  STARKNET_DEVNET = 0x11,
}

export interface ChainConfiguration {
  chainId: ChainId;
  explorer: string;
  rpc: string;
}

const configurations: ChainConfiguration[] = [
  {
    chainId: ChainId.ETHEREUM_MAINNET,
    explorer: 'https://etherscan.io',
    rpc: '',
  }
];
