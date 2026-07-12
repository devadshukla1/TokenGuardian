# Configuration Reference

TokenGuardian is highly configurable. You can adjust its behavior by placing configuration overrides directly at the beginning of your prompt or inside your Custom Instructions.

---

## ⚙️ Configuration Format

To override the default settings, prepending a simple YAML-like block to your message is the most token-efficient way for Claude to parse your configuration:

```text
[TG_CONFIG]
verbosity: minimal
prefer_lists: true
avoid_examples: true
[/TG_CONFIG]

Here is my request: How does DNS resolution work?
```

---

## 📋 Available Options

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `verbosity` | `string` | `balanced` | Set the output verbosity level. Options: `minimal`, `balanced`, `detailed`, `comprehensive`. |
| `response_style` | `string` | `direct` | The styling of responses. Options: `direct` (bullet lists, tables), `conversational` (sentence transitions), `academic` (formal). |
| `compress_context` | `boolean` | `true` | When `true`, instructs Claude to use semantic abbreviations for long, recurring terms in the conversation. |
| `deduplicate` | `boolean` | `true` | When `true`, strictly prohibits repeating code, definitions, or statements from earlier turns in the conversation. |
| `prefer_lists` | `boolean` | `true` | When `true`, forces Claude to present data, arguments, and structures in bulleted markdown lists or tables instead of prose. |
| `avoid_examples` | `boolean` | `false` | When `true`, prevents Claude from appending examples, code snippets, or use-case scenarios unless explicitly asked. |
| `output_budget` | `integer` | `0` (None) | A guidance number of words/tokens. Claude will truncate explanations or summaries to fit within this budget (e.g., `output_budget: 150`). |
| `explanation_level` | `string` | `conceptual` | Controls depth of explanations. Options: `none` (raw code/text only), `conceptual` (high-level logic only), `detailed` (low-level mechanics). |

---

## 🛠️ Configuration Scenarios

### Developer Mode (Maximum Token Savings)
For rapid coding and testing where you only want the code and zero explanations.
```yaml
[TG_CONFIG]
verbosity: minimal
deduplicate: true
prefer_lists: true
avoid_examples: true
explanation_level: none
[/TG_CONFIG]
```

### Researcher Mode (High-Density Summaries)
For digesting academic papers, long texts, or logs.
```yaml
[TG_CONFIG]
verbosity: balanced
response_style: direct
prefer_lists: true
compress_context: true
output_budget: 200
[/TG_CONFIG]
```

### Tutorial/Learning Mode (Slightly Verbose but Non-Redundant)
When learning a new codebase or concept and you need complete examples, but still want to skip polite greeting filler.
```yaml
[TG_CONFIG]
verbosity: detailed
avoid_examples: false
explanation_level: detailed
[/TG_CONFIG]
```
