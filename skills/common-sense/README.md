# Common Sense

A reusable reasoning skill for practical, accurate, efficient LLM behavior.

## What it does

Common Sense adds a decision layer that makes the model:

- Infer the user's actual objective before answering.
- Avoid unnecessary clarification and confirmation loops.
- Verify important assumptions instead of guessing.
- Use small brute-force/reference checks when they are cheaper than speculation.
- Distinguish verification algorithms from production algorithms.
- Produce the minimum **complete** answer rather than the minimum-length answer.
- Reject false precision and unsupported certainty.
- Prefer simple, current, stable, well-supported engineering techniques.
- Detect and correct overengineering, stale APIs, unnecessary dependencies, and non-optimal approaches.
- Match the output format to what the user actually requested.
- Stop when the requested goal is complete.

## Accuracy philosophy

The skill deliberately does **not** claim that an LLM can become "1000% accurate." Accuracy is increased through explicit verification gates, testing, source checking, and uncertainty handling. This makes the promise measurable and avoids turning confidence into a false guarantee.

## Contents

- [`SKILL.md`](./SKILL.md) — complete skill instructions.

## Verification model

```text
Understand
   ↓
Classify ambiguity
   ↓
Choose simplest viable approach
   ↓
Verify assumptions
   ↓
Test / brute-force-check when useful
   ↓
Optimize implementation
   ↓
Check completeness
   ↓
Deliver
   ↓
Stop
```

## Engineering behavior

For project work, implementation choices are treated as revisable unless the user explicitly requires them. The skill checks whether a proposed approach is current, supported, appropriately scaled, secure, maintainable, and simpler alternatives exist.

## Design principle

> Think appropriately. Verify cheaply when possible. Use the simplest optimal solution. Preserve everything required for correctness. Do not make the user do unnecessary work.
