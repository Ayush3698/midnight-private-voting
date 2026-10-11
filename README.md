# Private Voting on Midnight

![CI](https://github.com/Ayush3698/midnight-private-voting/actions/workflows/ci.yml/badge.svg)

A Yes/No voting application built with Midnight's privacy-focused blockchain technology. The project aims to support voter privacy and a publicly verifiable tally.

## Features

- Yes/No voting.
- Voter registration and eligibility checks.
- Nullifier-based protection against voting more than once.
- Public tally and ballot-count tracking.
- Zero-knowledge circuits for validating voting operations.
- Wallet-connected frontend.

## Quick Start

Install the project dependencies:

```bash
npm ci
```

Compile the Compact contract and circuits:

```bash
npm run compile
```

Run the tests:

```bash
npm test
```

## Privacy Model

### Information that may be publicly visible

- The poll's current phase.
- The running Yes/No tally.
- The number of ballots cast.
- The number of registered voter commitments.
- Public nullifiers used to prevent duplicate voting.

### Information intended to remain private

- The identity associated with each ballot.
- The voter's secret key.
- The voter's private Merkle path.

### Important privacy limitation

The current design notes state that `castVote` discloses the Boolean vote and a nullifier. If the Boolean vote is published on-chain, an observer can see the choice associated with each ballot, even if the voter's identity is not revealed.

Therefore, do not claim that individual vote choices are hidden unless the contract and generated circuits actually keep the vote private and expose only the necessary public outputs, such as the tally and nullifier.

## Trust Assumptions and Limitations

- The organizer determines who is eligible to vote.
- Small voting groups or unanimous results may reveal a participant's choice through inference.
- Timing correlations between wallet activity and tally changes may expose information.
- A compromised frontend could expose sensitive local information.
- The system does not provide coercion resistance.

## Architecture

`private-voting.compact` — ledger logic and circuits

→ Generated zero-knowledge circuits

→ `witnesses.ts` — private witness data, such as the secret key and Merkle path

→ Frontend — wallet connection, registration, opening and closing polls, voting, and tally display

## Selective Disclosure in `castVote`

According to the current design notes:

- **Disclosed:** Boolean vote and nullifier.
- **Kept private:** Secret key, leaf, and Merkle path.

**Note:** If the Boolean vote is a public output, individual vote secrecy is not provided. Verify the contract and generated circuits before making stronger privacy claims.