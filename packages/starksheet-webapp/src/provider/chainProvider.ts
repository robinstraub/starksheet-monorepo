import { ApplicationBinaryInterface, ContractCall, TransactionReceipt } from '../types';

export interface ChainProvider {
  /**
   * Gets the ABI for the contract matching the given address.
   */
  getAbi(address: string): Promise<ApplicationBinaryInterface>;

  /**
   * Calls the given contract.
   */
  callContract<T>(call: ContractCall): Promise<T>;

  /**
   * Waits for the given transaction to complete.
   */
  waitForTransaction(hash: string): Promise<void>;

  /**
   * Gets the transaction receipt matching the given hash.
   */
  getTransactionReceipt(hash: string): Promise<TransactionReceipt>;

  /**
   * todo: what is this ? just presentational data ?
   */
  getExplorerAddress(contractAddress: string): string;

  /**
   * todo: what is this ? just presentational data ?
   */
  getNftMarketplaceAddress(contractAddress: string): string;
}
