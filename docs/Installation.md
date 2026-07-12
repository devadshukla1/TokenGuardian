# Installation Guide

This document describes how to install and configure **TokenGuardian** in your Claude environment.

---

## 💻 1. Claude Web Interface (claude.ai)

To use TokenGuardian in the browser interface:

1. Open **Claude.ai** and log in to your account.
2. Click on your profile icon in the bottom-left corner and select **"Custom Instructions"**.
3. Enable Custom Instructions.
4. Copy the entire contents of **[SKILL.md](file:///SKILL.md)**.
5. Paste the instructions into the text area.
6. Click **"Save Changes"**.
7. Start a new chat. TokenGuardian will now optimize all responses.

---

## 🖥️ 2. Claude Desktop App

To install TokenGuardian globally on your Claude Desktop App using the configuration file:

### Windows
1. Open Windows Explorer and navigate to:
   `%APPDATA%\Claude`
2. Open or create the configuration file: `claude_desktop_config.json`.
3. Add the system instruction configuration. Since the Claude Desktop App allows global system prompt instructions, configure it like this:
   ```json
   {
     "global_instructions": "Paste the entire content of SKILL.md here as a single-line string"
   }
   ```
4. Restart Claude Desktop.

---

## 🛠️ 3. Claude Code CLI

If you are using **Claude Code** (the CLI agent), you can set system prompt overrides:

1. Create a custom configuration folder or initialize a local `.claudecode` prompt file if supported.
2. Alternatively, you can run Claude Code with the prompt appended:
   ```bash
   claude --system-prompt "$(cat /path/to/TokenGuardian/SKILL.md)"
   ```

---

## 🔌 4. API & Custom Agent Environments (Python / TypeScript)

If you are using the Anthropic API directly in code, you can pass TokenGuardian as the `system` parameter in your API payload.

### Python Example
```python
import anthropic

client = anthropic.Anthropic()

# Load the TokenGuardian system prompt
with open("SKILL.md", "r", encoding="utf-8") as f:
    token_guardian_prompt = f.read()

response = client.messages.create(
    model="claude-3-5-sonnet-20241022",
    max_tokens=1000,
    system=token_guardian_prompt,  # Inject TokenGuardian prompt
    messages=[
        {"role": "user", "content": "Write a fast python quicksort."}
    ]
)

print(response.content[0].text)
```

### TypeScript / JavaScript Example
```typescript
import Anthropic from '@anthropic-ai/sdk';
import * as fs from 'fs';

const anthropic = new Anthropic();
const tokenGuardianPrompt = fs.readFileSync('SKILL.md', 'utf-8');

async function main() {
  const message = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 1000,
    system: tokenGuardianPrompt, // Inject TokenGuardian prompt
    messages: [
      { role: 'user', content: 'What are the main components of a compiler?' }
    ],
  });
  console.log(message.content[0].text);
}

main();
```
