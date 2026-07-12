# Prompt Engineering Best Practices

To get the absolute best performance and maximum token savings out of **TokenGuardian**, follow these prompt engineering best practices.

---

## 🎯 1. Be Direct and Explicit

Do not use polite preambles or filler in your own prompts. For example, instead of:
> "Hello! I was wondering if you could please help me write a small script that fetches weather data from an API? Thank you so much!" (26 tokens)

Use:
> "Write a Python script to fetch weather data from OpenWeatherMap API." (12 tokens)

This reduces both input tokens and sets a direct tone that Claude will match in its output.

---

## 🧠 2. Structure Your Prompts for Caching

To take full advantage of Anthropic's **Prompt Caching**:
1. Keep the core system prompt ([SKILL.md](file:///SKILL.md)) unchanged.
2. Group stable reference data (e.g., APIs, database schemas, codebase summaries) at the beginning of the conversation.
3. Keep dynamic instructions and query-specific text at the very end of the prompt.
4. Do not insert timestamped metadata or variable strings in the middle of static prompts, as this invalidates the cache for all subsequent blocks.

---

## 🛠️ 3. Use Explicit "Request Flags"

TokenGuardian relies on **Progressive Disclosure**. This means Claude will only answer your direct question. If you need supplementary information, you must ask for it explicitly using clear keywords:

* **For setup instructions**: Append `"include setup steps."`
* **For structural context**: Append `"explain the architecture."`
* **For performance caveats**: Append `"explain performance trade-offs."`

---

## ⏱️ 4. Keep Conversations Focused

Long threads are the primary driver of high API costs.
* **One Topic per Chat**: When you finish debugging a specific function or researching a specific topic, close the chat and start a new one.
* **Compress History**: If you must continue a long thread, ask Claude to summarize the conversation so far:
  ```text
  [TG_CONFIG]
  verbosity: minimal
  [/TG_CONFIG]
  Summarize the decisions made in this chat into a compact list.
  ```
  Then copy that list into a fresh chat.
