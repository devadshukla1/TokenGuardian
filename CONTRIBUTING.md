# Contributing to TokenGuardian

First off, thank you for taking the time to contribute! 🎉

We welcome contributions from developers, technical writers, and prompt engineers of all experience levels. This document outlines the guidelines and best practices for contributing to the TokenGuardian repository.

## How Can I Contribute?

### 1. Reporting Bugs
If you find a bug in TokenGuardian (e.g., Claude ignoring prompt constraints, syntax errors in JSON manifests, or broken links in documentation), please open an issue using the [Bug Report Template](file:///.github/ISSUE_TEMPLATE/bug_report.md).

Include:
* A clear description of the issue.
* The specific version of TokenGuardian you are using.
* The model name (e.g., Claude 3.5 Sonnet, Claude 3 Opus) and the client (e.g., Claude Desktop, API, Console).
* Steps to reproduce the issue (including your prompt and Claude's response).
* The expected behavior versus the actual behavior.

### 2. Suggesting Features & Enhancements
If you have ideas for optimization strategies, configuration options, or formatting improvements, please open a feature request using the [Feature Request Template](file:///.github/ISSUE_TEMPLATE/feature_request.md).

### 3. Submitting Pull Requests
If you are ready to write code, update prompts, or improve documentation:
1. Fork the repository and create your branch from `main`.
2. Install the necessary development tools (see [Development Setup](#development-setup)).
3. Make your changes, ensuring they align with our [Commit Guidelines](#commit-guidelines) and code style.
4. Add or update tests in the `tests/` directory if you are modifying prompt behavior.
5. Submit a pull request using our [Pull Request Template](file:///.github/pull_request_template.md).

---

## Development Setup

To test prompt changes and validate the integrity of JSON configurations and Markdown documentation, set up your local environment:

### Prerequisites
* **Node.js** (v18 or higher) for markdown linting and JSON validation.
* **Git** for version control.

### Installation
1. Clone your fork locally:
   ```bash
   git clone https://github.com/<your-username>/TokenGuardian.git
   cd TokenGuardian
   ```
2. Install development dependencies:
   ```bash
   npm install
   ```

### Running Validation Scripts
Before pushing your changes, validate JSON schemas and Markdown formatting:
* **Lint Markdown files:**
  ```bash
  npm run lint:markdown
  ```
* **Lint JSON/YAML files:**
  ```bash
  npm run lint:json
  ```

---

## Prompt Optimization Best Practices

When editing the core prompt file ([SKILL.md](file:///SKILL.md)), you must ensure that changes do not degrade output quality or introduce redundant tokens.

1. **Keep it Dry (Don't Repeat Yourself):** Avoid duplicating rules. If a rule exists in the "Writing Style" section, do not repeat it in the "Programming Style" section.
2. **Be Actionable:** Instruct Claude on *what to do* rather than *what not to do* where possible, as positive reinforcement is more token-efficient.
3. **Validate Saved Tokens:** Test your prompt changes against the cases in `tests/benchmark.md` and measure the token usage. Make sure response quality is maintained.

---

## Commit Guidelines

We enforce **Conventional Commits** to automate changelog generation and releases. Your commit messages must follow this structure:

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

### Types
* `feat`: A new feature (e.g., adding a new configuration option or intent category).
* `fix`: A bug fix (e.g., fixing a prompt leak or manifest syntax error).
* `docs`: Documentation changes.
* `style`: Changes that do not affect the meaning of the code (formatting, white-space).
* `refactor`: A code/prompt change that neither fixes a bug nor adds a feature.
* `perf`: A change that improves performance or reduces token overhead.
* `test`: Adding missing tests or correcting existing tests.
* `chore`: Build processes, dependency updates, or auxiliary tools.

### Example Commit Message
```text
perf(prompt): optimize self-review instruction syntax

Refactored the internal self-review system prompt to use highly condensed
imperative commands. Saved ~12 tokens per invocation while maintaining
the same validation accuracy on edge case prompts.

Closes #42
```

---

## License

By contributing, you agree that your contributions will be licensed under the project's [MIT License](file:///LICENSE).
