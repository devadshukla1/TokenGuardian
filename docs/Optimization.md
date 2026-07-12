# Token Optimization Strategies

This document explains the technical theories and prompt design choices behind **TokenGuardian**. Every element of TokenGuardian is designed to target specific vector characteristics of LLM output generation to minimize token overhead.

---

## 📉 1. Conversational Overhead Optimization

By default, reinforcement learning from human feedback (RLHF) biases Claude to be polite, apologetic, and conversational. This behavior results in "Boilerplate Tokens" (e.g., `"Sure, I can write that function for you!"`).

```text
Default Output:
"Sure, here is the quicksort implementation in Python. Quicksort is an efficient sorting algorithm..." [50 tokens]

TokenGuardian Output:
```python
def quicksort(arr):
    # ...
``` [15 tokens]
```

### Prompt Strategy
Instead of using negative constraints like "Do not be conversational," which LLMs often fail to follow in complex states, TokenGuardian uses **Directive Reframing**:
> "Start the response directly with the core artifact (code, table, list). Conversational wrapper tokens are prohibited."

---

## 🧩 2. Context Compression and Prompt Caching

In multi-turn developer conversations, Claude reads the entire conversation history on every turn. Repeating long names or importing broad frameworks in code blocks creates massive token accumulations.

### Dynamic Semantic Subtitle System
TokenGuardian instructs Claude to assign dynamic nicknames to long terms defined during the session. For example:
* `[TG]` for `TokenGuardian`
* `[K8s]` for `Kubernetes`
* `[DB]` for `PostgreSQL Database Instance`

This saves input tokens on subsequent turns.

### Caching Friendly Layouts
Anthropic models support **Prompt Caching** for static segments of the prompt.
1. The **System Prompt** must remain entirely static. If you dynamically modify the system prompt per user request, you break the cache.
2. TokenGuardian structures user configurations (`[TG_CONFIG]`) inside the *user message* instead of modifying the system instructions. This ensures the system instruction block is cached, leading to up to a 90% cost savings on prompt reads.

---

## 🗃️ 3. High-Density Structured Layouts

Prose is highly inefficient for transferring technical information. Bullet lists and tables compress information density.

### Density Example
**Prose Style (Verbose - 72 words / 88 tokens):**
> "The first phase of the deployment is the infrastructure setup. During this phase, we initialize Terraform to create the virtual network. After that, the second phase is configuring the servers, which requires running Ansible playbooks to install Docker. Finally, the third phase is the application deployment, where we run Docker Compose to start the containers, and verify that the application is running."

**High-Density Bullet Style (Optimized - 37 words / 48 tokens):**
> * **Phase 1 (Infra)**: Initialize Terraform to create virtual networks.
> * **Phase 2 (Config)**: Run Ansible playbooks to install Docker on servers.
> * **Phase 3 (Deploy)**: Start containers using Docker Compose and verify health status.

---

## 🔍 4. Self-Review Loop Mechanics

To prevent Claude from generating draft code and then revising it in public (which burns tokens), TokenGuardian mandates an internal verification constraint before any text is output.

Claude verifies:
1. **Redundancy Check**: Did I repeat any import statement or variable definition?
2. **Boilerplate Check**: Did I add a transition statement like "Now let's examine..."?
3. **Budget Check**: Is this response fitting the `output_budget`?

This check occurs within Claude's internal planning tokens (if reasoning model) or before output emission, preventing token spill.
