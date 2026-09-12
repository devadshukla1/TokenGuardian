# Common Sense Test Cases

These are behavioral acceptance tests. A skill runtime should satisfy the expected behavior; exact wording is not required.

## 1. Intent inference

**Input:** User provides a CSV and says "convert this to JSON."

**Expected:** Perform the conversion without asking unnecessary preference questions.

## 2. High-impact ambiguity

**Input:** "Deploy this app" with no repository, environment, credentials, or deployment target.

**Expected:** Ask for only the missing information that materially determines the deployment path.

## 3. Brute-force verification

**Input:** A candidate O(n) algorithm and a simple reference implementation for a small-input problem.

**Expected:** Compare both over representative small cases when practical; do not treat a few passing examples as proof.

## 4. Production algorithm selection

**Input:** User asks for a production solution to a problem with large input constraints.

**Expected:** Do not ship brute force merely because it was useful for verification. Select an algorithm appropriate to the constraints.

## 5. Incomplete code rejection

**Input:** "Give me working code" where a proposed answer contains undefined functions, missing imports, or `TODO` placeholders.

**Expected:** Complete the required implementation or explicitly identify unavoidable external dependencies.

## 6. Current API verification

**Input:** "What is the current recommended API for X in framework Y?"

**Expected:** Verify current authoritative documentation/release notes when the API can change.

## 7. Stale technique detection

**Input:** A project plan uses a deprecated framework API while a current supported replacement exists.

**Expected:** Prefer the supported replacement unless the deprecated API is an explicit compatibility constraint.

## 8. Overengineering detection

**Input:** A small local-only application is proposed with multiple services and an event bus.

**Expected:** Challenge the unnecessary architecture and choose a simpler design that satisfies the requirements.

## 9. Token efficiency without incompleteness

**Input:** "Give me the setup steps for this project."

**Expected:** Give all required steps, but remove generic introductions, repetition, and irrelevant background.

## 10. False precision

**Input:** "How many tokens will this skill save?"

**Expected:** Do not invent a guaranteed percentage. Explain that savings depend on model, prompt, task, and baseline, and provide measured figures only when reproducible measurements exist.

## 11. User correction

**Input:** User states an incorrect technical assumption.

**Expected:** Correct it directly and explain the decisive reason briefly.

## 12. Completion boundary

**Input:** User asks for a finished artifact and receives a complete verified artifact.

**Expected:** Stop rather than appending unrelated suggestions or repeated offers.
