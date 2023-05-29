import { Abi, RpcProvider, SequencerProvider, number } from "starknet";
import { RC_BOUND } from "../utils/constants";
import { hex2str } from "../utils/hexUtils";
import { ChainProvider } from "./chainProvider";
import {ContractCall} from '../types';

export class StarknetProvider implements ChainProvider {
  private rpcProvider: RpcProvider;
  private sequencerProvider: SequencerProvider;
  private chainId: string;

  /**
   * Constructs a StarknetProvider.
   */
  constructor(rpcUrl: string, sequencerUrl: string) {
    this.sequencerProvider = new SequencerProvider({
      baseUrl: sequencerUrl,
    });

    this.rpcProvider = new RpcProvider({
      nodeUrl: rpcUrl,
    });

    this.chainId = "";
    this.rpcProvider.getChainId().then((id) => (this.chainId = hex2str(id)));
  }

  /**
   * @inheritDoc
   */
  getExplorerAddress(contractAddress: string) {
    return this.chainId === "SN_MAIN"
      ? `https://starkscan.co/contract/${contractAddress}`
      : `https://testnet.starkscan.co/contract/${contractAddress}`;
  }

  /**
   * @inheritDoc
   */
  getNftMarketplaceAddress(contractAddress: string) {
    return this.chainId === "SN_MAIN"
      ? `https://starkscan.co/contract/${contractAddress}`
      : `https://testnet.starkscan.co/contract/${contractAddress}`;
  }

  /**
   * @inheritDoc
   */
  waitForTransaction(hash: string): Promise<any> {
    return this.rpcProvider.waitForTransaction(hash, 50_000);
  }

  /**
   * @inheritDoc
   */
  getTransactionReceipt(hash: string): Promise<any> {
    return this.rpcProvider.getTransactionReceipt(hash);
  }

  /**
   * @inheritDoc
   */
  async getAbi(address: string): Promise<any> {
    let abi: Abi = [];
    if (number.toBN(address).eq(RC_BOUND)) {
      return abi;
    }

    let response;
    try {
      response = await this.sequencerProvider.getClassAt(address);
    } catch (error) {
      try {
        // @ts-ignore
        response = await this.sequencerProvider.fetchEndpoint(
          "get_class_by_hash",
          {
            classHash: address,
          }
        );
      } catch (error) {}
    }

    abi = response?.abi || abi;
    return [
      ...abi,
      ...(
        await Promise.all(
          abi
            .filter(
              (f) =>
                f.name.includes("impl") &&
                f.type === "function" &&
                f.stateMutability === "view" &&
                f.inputs.length === 0
            )
            .map(async (f) => {
              const implementationAddress =
                await this.sequencerProvider.callContract({
                  contractAddress: address,
                  entrypoint: f.name,
                });
              return Object.values(
                (await this.getAbi(implementationAddress.result[0])) || {}
              ) as Abi;
            })
        )
      ).flat(),
    ];
  }

  /**
   * @inheritDoc
   */
  async callContract<T>(call: ContractCall): Promise<T> {
    const response = await this.rpcProvider.callContract(call, "latest");
    return response.result[0] as T;
  }
}
