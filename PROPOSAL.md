# Proposal: Private Voting (Midnight — Full Moon)

**Problem.** Public-chain votes expose who voted and how. Off-chain voting hides ballots but the tally can't be verified.

**Solution.** An organizer registers voter *commitments* (hash of a secret). Voters prove in zero knowledge they're in the set and cast a Yes/No ballot. One ballot per voter is enforced via nullifiers.

| Public | Private |
|---|---|
| Tally, phase, number of ballots cast, voter commitments, nullifiers | Voter secret key, which registered voter cast which ballot, Merkle path |

**Flow.** Organizer deploys → registers commitments → opens voting → voters connect wallet & vote → organizer closes → anyone reads the tally.

**Scope.** Yes/No ballot, one poll per contract. Out of scope: multi-option ballots, weighted votes, coercion resistance.

**Deliverables.** Compact contract, 5 contract tests, GitHub Actions CI, React frontend with Lace wallet, README privacy model, 1-min demo.
