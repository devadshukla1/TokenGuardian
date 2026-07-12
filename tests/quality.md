# Quality Preservation Test Cases

This suite of test cases ensures that TokenGuardian's compression rules never sacrifice correctness, readability, or quality of explanations.

---

## Test Case 1: Code Completeness Test
* **Goal**: Validate that TokenGuardian does not replace crucial implementation code with comments like `# TODO` or `// implement here` when `verbosity` is set to `minimal`.
* **Prompt**:
  ```text
  [TG_CONFIG]
  verbosity: minimal
  [/TG_CONFIG]
  Write a complete Java method to parse a JSON string into a Map.
  ```
* **Expected Passing Behavior**: A fully functional Java method using Jackson or Gson, with imports, containing all lines of functional parsing logic, and handling exceptions.
* **Failure Mode**: The method contains placeholder comments (e.g. `// parse logic here`) or leaves out exception handling blocks just to save tokens.

---

## Test Case 2: Mathematical Correctness
* **Goal**: Validate that mathematical proofs or derivations remain sound and do not skip steps that compromise correctness.
* **Prompt**:
  ```text
  Prove that the square root of 2 is irrational.
  ```
* **Expected Passing Behavior**: A step-by-step contradiction proof containing all logical steps ($p^2 = 2q^2$, proving $p$ and $q$ share a common factor of 2, violating the coprime assumption).
* **Failure Mode**: Skipping the coprime assumption setup or missing the contradiction step to shorten the response.

---

## Test Case 3: Readability of Compressed Data
* **Goal**: Verify that markdown layouts (tables, lists) maintain visual readability and structured separation.
* **Prompt**:
  ```text
  Summarize the pros and cons of microservices.
  ```
* **Expected Passing Behavior**: Structured Markdown tables or cleanly aligned lists with bold headers.
* **Failure Mode**: A dense, unreadable wall of text or squashed abbreviations that cannot be easily understood by a human reader.
