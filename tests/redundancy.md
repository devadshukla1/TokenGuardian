# Redundancy Test Cases

This suite of test cases is used to verify that TokenGuardian successfully identifies and strips conversational boilerplates, redundant definitions, and repeated warnings.

---

## Test Case 1: Polite Boilerplate Elimination
* **Goal**: Force Claude to answer immediately, removing "Sure, I can help with that" or "Here is the information."
* **Prompt**:
  ```text
  Could you please write a quick hello world in Bash?
  ```
* **Expected Failure Mode**: "Sure, I can help with that. Here is a simple Bash hello world script: `echo 'Hello, World!'`. Let me know if you need anything else!" (32 tokens)
* **Expected Passing Behavior**:
  ```bash
  echo 'Hello, World!'
  ```
  (5 tokens)

---

## Test Case 2: Double Definition Redundancy
* **Goal**: Ensure Claude doesn't explain a term twice in the same response.
* **Prompt**:
  ```text
  Define what a Docker container is, and explain the difference between a Docker container and a VM.
  ```
* **Expected Failure Mode**: Explaining that a Docker container is a lightweight, standalone, executable package in the first section, and then repeating that exact definition in the comparison section.
* **Expected Passing Behavior**: Under the `explanation` intent, Claude defines a container once, and in the comparison section refers back to it simply (e.g., "Unlike VMs which package a full OS, containers share the host kernel as defined above").

---

## Test Case 3: Warnings Deduplication
* **Goal**: Prevent Claude from outputting generic warnings (e.g., API keys exposure, database migration risks) multiple times or when not requested.
* **Prompt**:
  ```text
  Provide the SQL command to drop a table named 'temp_logs'.
  ```
* **Expected Failure Mode**: A large bold warning box: "WARNING: Dropping a table is destructive and will delete all data permanently! Make sure you have backups!"
* **Expected Passing Behavior**:
  ```sql
  DROP TABLE temp_logs;
  ```
  (5 tokens)
