import type { WitnessContext } from "@midnight-ntwrk/compact-runtime";
import type { Ledger } from "./managed/private-voting/contract/index.cjs";

// Private state lives only in the user's browser/wallet storage.
export type VotingPrivateState = { secretKey: Uint8Array };

export const witnesses = {
  localSecretKey: ({ privateState }: WitnessContext<Ledger, VotingPrivateState>):
    [VotingPrivateState, Uint8Array] => [privateState, privateState.secretKey],

  getVoterPath: ({ privateState, ledger }: WitnessContext<Ledger, VotingPrivateState>,
    leaf: Uint8Array) => {
    const path = ledger.voters.findPathForLeaf(leaf);
    if (!path) throw new Error("Voter commitment not found in registry");
    return [privateState, path] as const;
  },
};
