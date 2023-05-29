import { ChainProvider } from './chainProvider';
import { ApplicationBinaryInterface, ContractCall, TransactionReceipt } from '../types';
import { Web3Provider } from '@ethersproject/providers';
import { Contract } from 'ethers';

/**
 * Represents an EVM-compatible implementation of the chain provider.
 */
export class EVMProvider implements ChainProvider {
  /**
   * Constructs an EVM Provider.
   */
  constructor(private explorer: string, private provider: Web3Provider) {}

  /**
   * @inheritDoc
   */
  async callContract<T = string>(options: ContractCall): Promise<T> {
    const abi = await this.getAbi(options.contractAddress);
    const contract = new Contract(options.contractAddress, abi, this.provider);

    return contract[options.entrypoint](...options.calldata);
  }

  /**
   * @inheritDoc
   */
  async getAbi(address: string): Promise<ApplicationBinaryInterface> {
    // build the query parameters
    const params = new URLSearchParams({
      action: 'getabi',
      address,
      apikey: 'FMUMQEYWRHAB67Q8YYGZFHM76K6HI1C4XK',
      module: 'contract',
    });
    // build the query url
    const url = new URL('https://api-goerli.etherscan.io/api', '');
    url.search = params.toString();

    const rawAbi = await fetch(url)
      // check the response is not an error and decode its content to json
      .then((response) => {
        if (!response.ok) {
          throw response.statusText;
        }
        return response.json();
    })
      // check the body of the response contains a "result" and returns it
      .then((data) => {
        if (!data.result) {
          throw `Unexpected error, got ${JSON.stringify(data)}`;
        }
        return data.result
      })
    ;

    // parse the raw abi and return it
    return JSON.parse(rawAbi);
  }

  /**
   * @inheritDoc
   */
  getExplorerAddress(contractAddress: string): string {
    return `${this.explorer}/contract/${contractAddress}`;
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
  getTransactionReceipt(hash: string): Promise<TransactionReceipt> {
    return this.provider.getTransactionReceipt(hash);
  }

  /**
   * @inheritDoc
   */
  async waitForTransaction(hash: string): Promise<void> {
    const transaction = await this.provider.getTransaction(hash);
    await transaction.wait();
  }
}