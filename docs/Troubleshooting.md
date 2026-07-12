# Troubleshooting Guide

This document covers common issues you might experience when running **TokenGuardian** and provides strategies to restore optimal behavior.

---

## 🔍 Issue 1: Claude is ignoring the configuration options

### Symptom
You specify `verbosity: minimal`, but Claude still provides a detailed response with conversational text.

### Causes
1. **Config block formatting error**: The `[TG_CONFIG]` tags might be misspelled.
2. **System prompt overrides**: The host environment (e.g., a custom wrapper script) might be overriding system instructions.

### Solutions
* Verify the tags are formatted exactly as:
  ```text
  [TG_CONFIG]
  verbosity: minimal
  [/TG_CONFIG]
  ```
* If the configuration is ignored in a long thread, remind Claude:
  ```text
  [TG_REMIND] respect minimal verbosity [/TG_REMIND]
  ```

---

## 🗜️ Issue 2: Over-compression (Lack of context or explanation)

### Symptom
Claude is being *too* brief. You requested code, and it returned the function without critical helper structures, or returned answers that are difficult to understand.

### Causes
The `verbosity` is set to `minimal` or `balanced`, but your query requires a detailed explanation or structural setup to be helpful.

### Solutions
* Explicitly request detailed explanations for that specific turn:
  ```text
  [TG_CONFIG]
  verbosity: detailed
  [/TG_CONFIG]
  ```
* Tell Claude: `"Explain the edge cases for this function."` By design, progressive disclosure will withhold details unless requested.

---

## 🔄 Issue 3: Prompt Drift (Multi-turn conversations)

### Symptom
During the first 2-3 turns, Claude is concise and efficient. By turn 10, Claude drifts back to its default verbose, polite assistant persona.

### Causes
As the conversation grows, the original system instructions (`SKILL.md`) lose their relative weight in the context window. The dynamic history dominates Claude's attention.

### Solutions
* **Inject configuration reminders**: Periodically include the configuration block in your follow-up prompts.
* **Reset context**: If the task is completed, start a new chat. Keeping chats focused on a single topic prevents prompt drift and saves significant input tokens.
