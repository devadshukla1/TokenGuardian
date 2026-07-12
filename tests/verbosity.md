# Verbosity Test Cases

This suite of test cases verifies that TokenGuardian's verbosity levels are respected across different configurations.

---

## Test Case 1: Minimal Verbosity Test
* **Goal**: Validate that `verbosity: minimal` strips all explanations and outputs raw content only.
* **Config Block**:
  ```text
  [TG_CONFIG]
  verbosity: minimal
  [/TG_CONFIG]
  ```
* **Prompt**:
  ```text
  Show me the config command to configure the global git user email to 'test@example.com'.
  ```
* **Expected Passing Behavior**:
  ```bash
  git config --global user.email "test@example.com"
  ```
  (8 tokens)
* **Failure Mode**: Any conversational text or description of what the `--global` flag does.

---

## Test Case 2: Balanced Verbosity Test (Default)
* **Goal**: Validate that `verbosity: balanced` uses concise bullet points, high-density statements, and limits explanation length.
* **Config Block**: (Omitted, defaults to balanced)
* **Prompt**:
  ```text
  What are the advantages of using REST APIs over SOAP?
  ```
* **Expected Passing Behavior**: A list of short, high-density bullets:
  * **Protocol**: REST uses HTTP; SOAP requires XML parsing.
  * **Coupling**: REST is loose; SOAP is tight.
  * **Payload**: REST supports JSON/YAML (lightweight); SOAP only supports XML (heavy).
  * **Caching**: REST requests are natively cacheable; SOAP requests are not.
* **Failure Mode**: Paragraph structures with long transition phrases and explanations.

---

## Test Case 3: Detailed Verbosity Test
* **Goal**: Validate that `verbosity: detailed` allows structural explanations but focuses on design choices and "why" rather than repeating basic definitions.
* **Config Block**:
  ```text
  [TG_CONFIG]
  verbosity: detailed
  [/TG_CONFIG]
  ```
* **Prompt**:
  ```text
  Explain why Golang handles concurrency using CSP channels instead of thread sharing.
  ```
* **Expected Passing Behavior**: A concise architectural breakdown focusing on CSP theory, memory allocation differences (goroutine stack sizes vs. thread stack sizes), and avoidance of lock contention. 
* **Failure Mode**: Explaining what Go is or writing a verbose greeting.
