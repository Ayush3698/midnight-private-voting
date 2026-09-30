// Test harness. Wire this to your compact-runtime version:
// build a circuit context from the generated Contract, swap in a per-user
// private state (secretKey) for each `.as(user)` call, and thread the
// resulting ledger state through successive circuit calls.
import { Contract, ledger as readLedger } from "../managed/private-voting/contract/index.cjs";
import { witnesses } from "../witnesses.js";
// TODO: import createConstructorContext / createCircuitContext from
// "@midnight-ntwrk/compact-runtime" (see Midnight's example-counter simulator).

export const sk = (n: number): Uint8Array => new Uint8Array(32).fill(n);
export interface Simulator {
  as(user: Uint8Array): {
    registerVoter(c: Uint8Array): void; openVoting(): void; closeVoting(): void; castVote(v: boolean): void;
  };
  commitment(user: Uint8Array): Uint8Array;
  ledger(): { yesVotes: bigint; noVotes: bigint };
  ledgerRaw(): unknown;
}
export function createSimulator(_organizer: Uint8Array): Simulator {
  void Contract; void readLedger; void witnesses;
  throw new Error("Implement using compact-runtime; follow the example-counter simulator.");
}
