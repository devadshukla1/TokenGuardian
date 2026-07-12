# Writing & Editing Optimization Example

This example demonstrates how TokenGuardian delivers edited texts directly, removing meta-commentary about the editing process.

---

## 🙋 User Prompt
> Edit this paragraph for clarity and impact:
> "We are basically trying to find a way to make our app faster. So what we did was we decided to implement caching because it saves database lookups and makes things load faster for users who are visiting our site."

---

## ❌ Normal Response
> Here is a more clear and impactful version of your paragraph. I have removed the conversational filler (like "basically" and "so what we did was") and reframed the actions to be more active and professional.
> 
> **Edited Version:**
> "To improve application performance, we implemented database query caching, significantly reducing latency and enhancing response times for end users."
> 
> ### Key improvements made:
> * Removed weak phrases like "basically trying to find".
> * Replaced informal terms like "makes things load faster" with technical equivalents ("reducing latency").
> * Put the focus on the outcome (improved performance).
> 
> Let me know if you would like me to adjust the tone to be more casual or more formal!

* **Tokens used**: ~152 tokens.

---

##  Optimized TokenGuardian Response
> "To improve application performance, we implemented database query caching, significantly reducing latency and enhancing response times for end users."

* **Tokens used**: ~24 tokens.

---

## 📊 Token Savings Analysis

* **Normal Response Tokens**: 152
* **TokenGuardian Response Tokens**: 24
* **Total Tokens Saved**: 128 tokens
* **Output Token Reduction**: **84.2%**
* **Why it saved tokens**: Under the `editing` intent strategy, TokenGuardian instructs Claude to return the edited text *directly*, omitting explanations of why edits were made unless explicitly asked.
