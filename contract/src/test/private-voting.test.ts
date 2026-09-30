// Contract tests: run the circuits locally in-process (no network needed).
// `createSimulator` (./simulator.ts) is a thin wrapper around the generated
// contract + compact-runtime, following Midnight's example-counter pattern.
// Adjust its imports to your installed compact-runtime version.
import { describe, it, expect, beforeEach } from "vitest";
import { createSimulator, sk, type Simulator } from "./simulator.js";

describe("private voting", () => {
  let sim: Simulator;
  const alice = sk(1), bob = sk(2), mallory = sk(3), organizer = sk(99);

  beforeEach(() => {
    sim = createSimulator(organizer);
    sim.as(organizer).registerVoter(sim.commitment(alice));
    sim.as(organizer).registerVoter(sim.commitment(bob));
    sim.as(organizer).openVoting();
  });

  it("counts a valid vote and updates only the tally", () => {
    sim.as(alice).castVote(true);
    expect(sim.ledger().yesVotes).toBe(1n);
    expect(sim.ledger().noVotes).toBe(0n);
  });

  it("rejects a double vote from the same voter", () => {
    sim.as(alice).castVote(true);
    expect(() => sim.as(alice).castVote(false)).toThrow(/already voted/);
    expect(sim.ledger().noVotes).toBe(0n);
  });

  it("rejects a voter who was never registered", () => {
    expect(() => sim.as(mallory).castVote(true)).toThrow();
  });

  it("only the organizer can close voting; closed polls reject votes", () => {
    expect(() => sim.as(alice).closeVoting()).toThrow(/organizer/);
    sim.as(organizer).closeVoting();
    expect(() => sim.as(bob).castVote(true)).toThrow(/not open/);
  });

  it("privacy: public ledger contains no voter secret", () => {
    sim.as(alice).castVote(true);
    const dump = JSON.stringify(sim.ledgerRaw(), (_, v) =>
      typeof v === "bigint" ? v.toString()
      : v instanceof Uint8Array ? Buffer.from(v).toString("hex") : v);
    expect(dump).not.toContain(Buffer.from(alice).toString("hex"));
  });
});
