/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import type { Contract, Invocation, EstimateFeeResponse } from "starknet";
import type { BigNumberish } from "starknet/utils/number";
import type { BlockIdentifier } from "starknet/provider/utils";
import type BN from "bn.js";

export interface rendering extends Contract {
  number_to_index(
    token_id: BigNumberish,
    options?: { blockIdentifier?: BlockIdentifier }
  ): Promise<[BN] & { res: BN }>;
  Starksheet_render_token_uri(
    token_id: BigNumberish,
    value: BigNumberish,
    name: BigNumberish,
    options?: { blockIdentifier?: BlockIdentifier }
  ): Promise<[BN[]] & { token_uri: BN[] }>;
  functions: {
    number_to_index(
      token_id: BigNumberish,
      options?: { blockIdentifier?: BlockIdentifier }
    ): Promise<[BN] & { res: BN }>;
    Starksheet_render_token_uri(
      token_id: BigNumberish,
      value: BigNumberish,
      name: BigNumberish,
      options?: { blockIdentifier?: BlockIdentifier }
    ): Promise<[BN[]] & { token_uri: BN[] }>;
  };
  callStatic: {
    number_to_index(
      token_id: BigNumberish,
      options?: { blockIdentifier?: BlockIdentifier }
    ): Promise<[BN] & { res: BN }>;
    Starksheet_render_token_uri(
      token_id: BigNumberish,
      value: BigNumberish,
      name: BigNumberish,
      options?: { blockIdentifier?: BlockIdentifier }
    ): Promise<[BN[]] & { token_uri: BN[] }>;
  };
  populateTransaction: {
    number_to_index(
      token_id: BigNumberish,
      options?: { blockIdentifier?: BlockIdentifier }
    ): Invocation;
    Starksheet_render_token_uri(
      token_id: BigNumberish,
      value: BigNumberish,
      name: BigNumberish,
      options?: { blockIdentifier?: BlockIdentifier }
    ): Invocation;
  };
  estimateFee: {
    number_to_index(
      token_id: BigNumberish,
      options?: { blockIdentifier?: BlockIdentifier }
    ): Promise<EstimateFeeResponse>;
    Starksheet_render_token_uri(
      token_id: BigNumberish,
      value: BigNumberish,
      name: BigNumberish,
      options?: { blockIdentifier?: BlockIdentifier }
    ): Promise<EstimateFeeResponse>;
  };
}