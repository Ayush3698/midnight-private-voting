# Private Voting on Midnight
![CI](https://github.com/<you>/private-voting/actions/workflows/ci.yml/badge.svg)

Anonymous Yes/No ballots with a publicly verifiable tally. Built for the Midnight Full Moon cycle.

**Live demo:** <link> · **Video:** <link> · **Tests:** `docs/tests.png`

## Quick start
```bash
npm ci
npm run compile   # compiles the Compact contract + ZK circuits
npm test          # runs contract tests
```

## Privacy model
**An observer CAN learn:** the poll is in a given phase; the running Yes/No tally; how many ballots were cast; how many voter commitments were registered; that each ballot came from a registered voter who voted at most once.

**An observer CANNOT learn:** who cast any ballot, which registered voter a ballot belongs to (nullifiers are one-way, domain-separated hashes), how any individual voted beyond what the tally implies, or any voter's secret key or Merkle path.

**Trust assumptions / limits:** the organizer chooses who is eligible; if only one voter is registered or everyone votes the same way, results reveal that voter's choice; timing correlation between wallet activity and tally changes is possible; a compromised frontend could leak the secret key; no coercion resistance.

## Architecture
`private-voting.compact` (ledger + circuits) → generated ZK circuits → `witnesses.ts` (secret key + Merkle path, local only) → frontend (wallet connect, register/open/vote/close, tally view).

## Selective disclosure in `castVote`
Disclosed: the boolean vote and a nullifier. Kept private: secret key, leaf, Merkle path.
