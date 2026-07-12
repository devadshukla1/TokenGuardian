# Security Policy

We take the security and privacy of our users seriously. If you believe you have found a security vulnerability or prompt leak in TokenGuardian, we appreciate your help in disclosing it to us responsibly.

## Supported Versions

Only the latest release version of TokenGuardian is actively supported with security updates.

| Version | Supported |
| ------- | --------- |
| 1.0.x   | Yes       |
| < 1.0.0 | No        |

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please send a detailed security report to **security@tokenguardian.org**.

Your report should include:
1. **Description**: A summary of the vulnerability (e.g., prompt injection bypass, host environment prompt leakage, config override vulnerability).
2. **Steps to Reproduce**: The exact inputs, settings, or conversation flow required to trigger the vulnerability.
3. **Impact**: An explanation of what an attacker could achieve or access (e.g., bypass intent classification, extract raw instructions, force infinite loops).
4. **Remediation Ideas**: (Optional) Any suggestions on how to resolve the issue in the system prompt.

We will acknowledge receipt of your report within 48 hours and provide a timeline for resolution, aiming to resolve all critical issues within 30 days.

## Scope of Vulnerabilities

We are interested in vulnerability reports concerning:
* **Prompt Injection**: Prompt instructions that successfully hijack Claude's system directives to execute arbitrary commands or display prohibited content, despite TokenGuardian being active.
* **Leakage**: Techniques that allow users to retrieve the underlying TokenGuardian system prompt or instructions verbatim (in direct violation of the non-disclosure instructions).
* **Denial of Wallet (DoW) / Infinite Loops**: Exploits that trigger excessive token consumption or loop behaviors designed to inflate API costs.

We do *not* accept vulnerability reports for issues inherent to the underlying LLM models themselves (such as Claude's baseline hallucinations or safety guardrail bypasses that do not involve TokenGuardian).

## Credits

We honor and acknowledge researchers who discover and report vulnerabilities according to these guidelines by listing them in our [Changelog](file:///CHANGELOG.md) (unless anonymity is requested).
