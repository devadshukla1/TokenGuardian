# Frequently Asked Questions (FAQ)

Here are the most common questions regarding the installation, configuration, and operation of **TokenGuardian**.

---

### Q: Does TokenGuardian support Prompt Caching?
**Yes.** TokenGuardian is structured specifically to make the most of Anthropic's **Prompt Caching** feature. The system prompt (`SKILL.md`) is completely static. User configurations are passed inside user messages using the `[TG_CONFIG]` block, which prevents breaking the system-level cache.

---

### Q: Which Claude models are compatible?
TokenGuardian is fully compatible with:
* **Claude 3.5 Sonnet** (Highly recommended - best balance of prompt adherence and speed)
* **Claude 3 Opus** (Excellent instruction following, but slower and more expensive)
* **Claude 3 Haiku** (Fastest and cheapest; saves additional tokens, though occasionally needs reinforcement on strict rules)
* **Claude 3.5 Haiku**

---

### Q: Will TokenGuardian reduce the quality of Claude's answers?
**No.** TokenGuardian's core objective is to reduce *unnecessary* tokens (filler words, conversational boilerplate, duplicate imports, redundant explanations). It explicitly instructs Claude: `"never sacrifice answer quality or correctness."` You will still get correct, complete code and logic—just without the fluff.

---

### Q: How does TokenGuardian compare to other prompt optimizers?
Unlike general "prompt compressors" that mangle your input prompt into unreadable symbols, TokenGuardian optimizes **Claude's output response**. It changes the way Claude thinks, drafts, and reviews its responses before emitting them.

---

### Q: What should I do if Claude ignores my verbosity setting?
If Claude begins outputting verbose text despite having `verbosity: minimal` configured:
1. Ensure your configuration block is typed correctly at the very top of your prompt.
2. If using the Web UI, double-check that your Custom Instructions are enabled and the prompt was saved.
3. See the **[Troubleshooting Guide](file:///docs/Troubleshooting.md)** for instructions on how to reinforce rules in multi-turn conversations.

---

### Q: Can I use TokenGuardian with other AI models (e.g., GPT-4o, Gemini)?
**Yes.** While the system prompt in `SKILL.md` is optimized for Claude's conversational habits and instructions-following characteristics, the general prompt directives will work effectively to optimize responses from other advanced LLMs.
