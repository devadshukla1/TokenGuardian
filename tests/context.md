# Context Compression Test Cases

This suite of test cases evaluates TokenGuardian's ability to compress conversation history using semantic markers and avoid repeating context in multi-turn conversations.

---

## Test Case 1: Semantic Abbreviations
* **Goal**: Validate that Claude introduces and uses short markers (e.g. `[TG]`) to refer to long concepts in a multi-turn thread.
* **Prompt (Turn 1)**:
  ```text
  We are going to discuss the Model Context Protocol in detail. Introduce the protocol.
  ```
* **Expected Passing Behavior**: The response introduces Model Context Protocol and designates it as `[MCP]`.
* **Prompt (Turn 2)**:
  ```text
  How do we build a server for the Model Context Protocol?
  ```
* **Expected Passing Behavior**: The response uses the abbreviation `[MCP]` instead of reprinting "Model Context Protocol" throughout the text (e.g. "To build an [MCP] server, initialize...").

---

## Test Case 2: Multi-turn Memory Deduplication
* **Goal**: Ensure Claude doesn't repeat code blocks or parameters when continuing a conversation.
* **Prompt (Turn 1)**:
  ```text
  Write a Python class that connects to PostgreSQL and executes a query.
  ```
* **Expected Passing Behavior**: Claude outputs the Postgres connection class.
* **Prompt (Turn 2)**:
  ```text
  Add a method to insert a record into the 'users' table.
  ```
* **Expected Failure Mode**: Claude reprints the entire connection class including imports, init method, and query execution method, just to show the new insert method.
* **Expected Passing Behavior**: Claude outputs *only* the new insert method block, specifying where to place it inside the existing class.
  ```python
  # Add this method to your existing database class:
  def insert_user(self, username, email):
      # ...
  ```
