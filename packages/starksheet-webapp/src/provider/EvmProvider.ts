import {ChainProvider} from './chainProvider';
import {ChainConfiguration, ContractCall} from '../types';
import {Web3Provider} from 'wido-widget';

/**
 * A EVM-compatible implementation of the ChainProvider.
 */
export class EvmProvider implements ChainProvider {
  /**
   * Creates an EVM provider for the given configuration.
   */
  constructor(private chain: ChainConfiguration, private provider: Web3Provider) {}

  /**
   * @inheritDoc
   */
  callContract<T>(call: ContractCall) {
    return Promise.resolve(undefined as T);
  }

  /**
   * @inheritDoc
   */
  getAbi(address: string): Promise<any> {
    // TODO: Implement.
    //       Best way to retrieve an ABI from a given address is to leverage the chain block explorer (e.g. etherscan)
    //       and call its API. This requires 1. the block explorer to have an endpoint for that (e.g.
    //       https://api.etherscan.io/api?module=contract&action=getabi for etherscan) and 2. the smart contract sources
    //       being published.
    return Promise.resolve(undefined);
  }

  /**
   * @inheritDoc
   */
  getExplorerAddress(contractAddress: string): string {
    return `${this.chain.explorer}/contract/${contractAddress}`;
  }

  /**
   * @inheritDoc
   */
  getNftMarketplaceAddress(contractAddress: string): string {
    return this.getExplorerAddress(contractAddress);
  }

  /**
   * @inheritDoc
   */
  getTransactionReceipt(hash: string) {
    return this.provider.getTransactionReceipt(hash);
  }

  /**
   * @inheritDoc
   */
  async waitForTransaction(hash: string) {
    const transaction = await this.provider.getTransaction(hash);
    await transaction.wait();
  }
}